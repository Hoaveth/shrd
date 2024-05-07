<?php
namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Services\UtilService;
use Illuminate\Support\Facades\Log;

class CustomerService {
    protected $shop;
    protected $token;
    protected $client;
    protected $utilService;

    protected $appService;

    public function __construct(UtilService $utilService, AppService $appService) {
        $this->shop = env('SHOPIFY_STORE_DOMAIN');
        $this->token = env('SHOPIFY_API_TOKEN');
        $this->client = new Client();
        $this->utilService = $utilService;
        $this->appService = $appService;
    }

    public function fetchCustomerById($customerId, $selectedStore) {
        
        $store = $this->appService->getStoreDetails($selectedStore);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        
        $url = "{$this->shop}/admin/api/2024-04/customers/{$customerId}.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];
    
        try {
            $response = $this->client->request('GET', $url, ['headers' => $headers]);
            
            if ($response->getStatusCode() === 200) {
                return json_decode($response->getBody()->getContents(), true)['customer'];
            } else {
                throw new \Exception('Failed to fetch customer data');
            }
        } catch (\Exception $e) {
            // Handle the exception (log it, throw it, or return a user-friendly error)
            throw $e;
        }
    }
    

    public function fetchAllCustomers($limit = 250, $pageInfo = null, $selectedShop = 1) {
        if(!$selectedShop){
            $firstStore = $this->appService->getFirstStore();
            $store = $this->appService->getStoreDetails($firstStore->id);
        }
        else{
            $store = $this->appService->getStoreDetails($selectedShop);
        }

        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        
        
        $url = "{$this->shop}/admin/api/2024-04/customers.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];
    
        $query = ['limit' => $limit];
        if ($pageInfo) {
            $query['page_info'] = $pageInfo;
        }
    
        try {
            $response = $this->client->request('GET', $url, [
                'headers' => $headers,
                'query' => $query
            ]);
            
            if ($response->getStatusCode() === 200) {
                return $response;
            } else {
                throw new \Exception('Failed to fetch customers data');
            }
        } catch (\Exception $e) {
            // Handle the exception
            throw $e;
        }
    }
    
    public function addCustomer(Request $request){

        $store = $this->appService->getStoreDetails($request->shop);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/customers.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        $customerData = [
            'customer' => [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                // 'verified_email' => $request->input('verified_email', true),
                'verified_email' => true,
                'send_email_welcome' => true,
                'addresses' => [
                    [
                        'address1' => $request->input('addresses.0.address1'),
                        'city' => $request->input('addresses.0.city'),
                        'province' => $request->input('addresses.0.province'),
                        'phone' => $request->input('phone'),
                        'zip' => $request->input('addresses.0.zip'),
                        'last_name' => $request->input('last_name'),
                        'first_name' => $request->input('first_name'),
                        'country' => $request->input('addresses.0.country'),
                    ],
                ],
                
            ],
        ];
        try {
            $response = $this->client->request('POST', $url, [
                'headers' => $headers,
                'json' => $customerData,
            ]);

            return ($response->getStatusCode() === 200 || $response->getStatusCode() === 201);
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    public function updateCustomer(Request $request, $customerId, $storeId)
    {

        $store = $this->appService->getStoreDetails($storeId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/customers/$customerId.json"; // URL for updating a specific customer
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        // Prepare the updated customer data
        $customerData = [
            'customer' => $request->all() // You might want to filter this to only the fields Shopify allows
        ];

        try {
            $response = $this->client->request('PUT', $url, [
                'headers' => $headers,
                'json' => $customerData,
            ]);
            return ($response->getStatusCode() === 200 || $response->getStatusCode() === 201);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function deleteCustomers(Request $request)
    {
        $store = $this->appService->getStoreDetails($request->shop);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        // Fetch customer IDs from request
        $customerIds = $request->input('customer_ids', []);
        try {
        foreach ($customerIds as $customerId) {
            $url = "{$this->shop}/admin/api/2024-04/customers/$customerId.json";
                $response = $this->client->request('DELETE', $url, ['headers' => $headers]);
                if ($response->getStatusCode() !== 200) {
                    throw new \Exception('API Request Failed');
                }
        }

        return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // Fetches all customer data from the Shopify API
    public function getCustomers(Request $request)
    {
        $selectedStore = $request->shop;
        $limit = $request->query('limit', 250);
        $allCustomers = [];
        $pageInfo = null;

        do {
            $response = $this->fetchAllCustomers($limit, $pageInfo, $selectedStore);
            $pageInfo = $this->utilService->getNextPageInfo($response);
            $customers = json_decode($response->getBody()->getContents(), true)['customers'];
            $allCustomers = array_merge($allCustomers, $customers);
        } while ($pageInfo);

        return $allCustomers;
    }

    public function getDefaultCustomers(Request $request, $shopId)
    {
        // $selectedStore = $request->shop;
        $limit = $request->query('limit', 250);
        $allCustomers = [];
        $pageInfo = null;

        do {
            $response = $this->fetchAllCustomers($limit, $pageInfo, $shopId);
            $pageInfo = $this->utilService->getNextPageInfo($response);
            $customers = json_decode($response->getBody()->getContents(), true)['customers'];
            $allCustomers = array_merge($allCustomers, $customers);
        } while ($pageInfo);

        return $allCustomers;
    }

    public function getEventsForCustomer($customerId)
    {
        $eventsUrl = "{$this->shop}/admin/api/2024-04/orders/5455839920429/events.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('GET', $eventsUrl, [
                'headers' => $headers
            ]);

            if ($response->getStatusCode() === 200) {
                $events = json_decode($response->getBody()->getContents(), true)['events'];

                return $events;
            } else {
                // Handle non-successful response
                throw new \Exception('API Request Failed');
            }
        } catch (\Exception $e) {
            // Handle exception
            throw $e;
        }
    }

    public function updateNote(Request $request)
    {
        $customerId = $request->customer_id;
        
        $store = $this->appService->getStoreDetails($request->shop_id);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        $url = "{$this->shop}/admin/api/2024-04/customers/$customerId.json"; // URL for updating a specific customer
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        $customerData = [
            'customer' => [
                'note' => $request->note
            ]
        ];

        try {
            $response = $this->client->request('PUT', $url, [
                'headers' => $headers,
                'json' => $customerData,
            ]);
            return ($response->getStatusCode() === 200 || $response->getStatusCode() === 201);
        } catch (\Exception $e) {
            throw $e;
        }
    }

}
?>
