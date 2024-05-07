<?php
namespace App\Services;

use GuzzleHttp\Client;
use App\Services\UtilService;
use App\Services\ProductService;
use Illuminate\Http\Request;

use App\Services\AppService;

class OrderService
{
    protected $shop;
    protected $token;
    protected $client;
    protected $utilService;
    protected $productService;
    protected $appService;

    public function __construct(UtilService $utilService, ProductService $productService, AppService $appService)
    {
        $this->shop = env('SHOPIFY_STORE_DOMAIN');
        $this->token = env('SHOPIFY_API_TOKEN');
        $this->client = new Client();
        $this->utilService = $utilService;
        $this->productService = $productService;
        $this->appService = $appService;
    }

    public function fetchOrdersWithPagination($pageInfo = null, $limit = 250, $customerId = null, $shopId)
    {
        try {
            if($shopId != null){
                $store = $this->appService->getStoreDetails($shopId);
                $this->shop = $store->shopify_domain;
                $this->token = $store->shopify_token;
            }
            $url = "{$this->shop}/admin/api/2024-04/orders.json";
            $headers = ['Content-Type' => 'application/json', 'X-Shopify-Access-Token' => $this->token];

            $query = ['limit' => $limit, 'status' => 'any', 'order' => 'created_at desc'];
            if ($customerId) {
                $query['customer_id'] = $customerId;
            }
            if ($pageInfo) {
                $query['page_info'] = $pageInfo;
            }

            $response = $this->client->request('GET', $url, ['headers' => $headers, 'query' => $query]);
            if ($response->getStatusCode() === 200) {
                return $response;
            } else {
                throw new \Exception("Unexpected response status: " . $response->getStatusCode());
            }
        } catch (\Exception $e) {
            // Handle exception
            throw new \Exception("Error fetching orders: " . $e->getMessage());
        }
    }

    public function fetchOrdersByStoreWithPagination($pageInfo = null, $limit = 250, $shopId = null)
    {
        try {
            if($shopId){
                $store = $this->appService->getStoreDetails($shopId);
                $this->shop = $store->shopify_domain;
                $this->token = $store->shopify_token;
            }
            $url = "{$this->shop}/admin/api/2024-04/orders.json";
            $headers = ['Content-Type' => 'application/json', 'X-Shopify-Access-Token' => $this->token];

            $query = ['limit' => $limit, 'status' => 'any', 'order' => 'created_at desc'];

            if ($pageInfo) {
                $query['page_info'] = $pageInfo;
            }

            $response = $this->client->request('GET', $url, ['headers' => $headers, 'query' => $query]);
            if ($response->getStatusCode() === 200) {
                return $response;
            } else {
                throw new \Exception("Unexpected response status: " . $response->getStatusCode());
            }
        } catch (\Exception $e) {
            // Handle exception
            throw new \Exception("Error fetching orders: " . $e->getMessage());
        }
    }

    public function getAllOrders($customerId = null, $shopId)
    {
        try {
            $allOrders = [];
            $pageInfo = null;
            do {
                $response = $this->fetchOrdersWithPagination($pageInfo, 250, $customerId, $shopId);
                $pageInfo = $this->utilService->getNextPageInfo($response);
                $orders = json_decode($response->getBody()->getContents(), true)['orders'];
                $allOrders = array_merge($allOrders, $orders);
            } while ($pageInfo);
            return $allOrders;
        } catch (\Exception $e) {
            // Handle exception
            throw new \Exception("Error getting all orders: " . $e->getMessage());
        }
    }

    public function getOrdersByCustomerId($customerId, $shopId)
    {
        if($shopId){
            $store = $this->appService->getStoreDetails($shopId);
            $this->shop = $store->shopify_domain;
            $this->token = $store->shopify_token;
        }
        $ordersUrl = "{$this->shop}/admin/api/2024-04/orders.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('GET', $ordersUrl, [
                'headers' => $headers,
                'query' => [
                    'limit' => 250,
                    'customer_id' => $customerId,
                    'order' => 'created_at desc'
                ],
            ]);

            if ($response->getStatusCode() === 200) {
                return json_decode($response->getBody()->getContents(), true)['orders'];
            } else {
                // Handle non-successful response
                throw new \Exception('API Request Failed');
            }
        } catch (\Exception $e) {
            // Handle exception
            throw $e;
        }
    }

    public function getEventsForOrder($orderId)
    {
        $eventsUrl = "{$this->shop}/admin/api/2024-04/orders/{$orderId}/events.json";
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

    public function getOrderById($orderId, $shopId) {
        if($shopId){
            $store = $this->appService->getStoreDetails($shopId);
            $this->shop = $store->shopify_domain;
            $this->token = $store->shopify_token;
        }
        $orderUrl = "{$this->shop}/admin/api/2024-04/orders/{$orderId}.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('GET', $orderUrl, ['headers' => $headers]);

            if ($response->getStatusCode() === 200) {
                return json_decode($response->getBody()->getContents(), true)['order'];
            } else {
                // Handle non-successful response
                throw new \Exception('API Request Failed with status code: ' . $response->getStatusCode());
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getOrderDetailsWithProducts($orderId, $shopId)
    {
        // Initialize an empty array for the response
        $response = [
            'order' => null,
            'products' => [],
            'events' => [],
            'shop' => null
        ];

        // Retrieve the order by ID and check if it exists
        $order = $this->getOrderById($orderId, $shopId);
        if ($order === null) {
            // Return early if the order is not found
            return $response;
        }

        // Proceed with extracting products if the order exists
        $extractedProducts = $this->productService->extractLineItems($order);

        // Check if extracted products are available 
        if (!empty($extractedProducts)) {
            $productVariantPairs = $this->productService->extractProductAndVariantIds($extractedProducts);

            // Only proceed if productVariantPairs are not empty
            if (!empty($productVariantPairs)) {
                $productsWithVariants = $this->productService->getProductsWithVariant($productVariantPairs, $shopId);
                if (!empty($productsWithVariants)) {
                    // Update the response with retrieved products
                    $response['products'] = $productsWithVariants;
                }
            }
            
        }

        // Update the response with the retrieved order
        $response['order'] = $order;

        // Get Order Events
        $events = $this->getEventsForOrder($orderId);

        $response['events'] = $events;

        $shop = $this->appService->getStoreDetails($shopId);

        $response['shop'] = $shop;
        return $response;
    }

    public function updateNote(Request $request)
    {
        $orderId = $request->order_id;
        
        $store = $this->appService->getStoreDetails($request->shop_id);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        $url = "{$this->shop}/admin/api/2024-04/orders/$orderId.json"; // URL for updating a specific customer
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        $customerData = [
            'order' => [
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

    public function updateOrder(Request $request)
    {
        $orderId = $request->id;
        
        $store = $this->appService->getStoreDetails($request->shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;
        $url = "{$this->shop}/admin/api/2024-04/orders/$orderId.json"; // URL for updating a specific customer
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        $orderData = [
            'order' => [
                'id' => $orderId,
                'shipping_address' => [
                    'last_name' => $request->shipping_address['last_name'],
                    'first_name' => $request->shipping_address['first_name'],
                    'company' => $request->shipping_address['company'],
                    'address1' => $request->shipping_address['address1'],
                    'address2' => $request->shipping_address['address2'],
                    'city' => $request->shipping_address['city'],
                    'province' => $request->shipping_address['province'],
                    'country' => $request->shipping_address['country'],
                    'zip' => $request->shipping_address['zip'],
                    'phone' => $request->shipping_address['phone']
                ]
            ]
        ];

        try {
            $response = $this->client->request('PUT', $url, [
                'headers' => $headers,
                'json' => $orderData,
            ]);
            return ($response->getStatusCode() === 200 || $response->getStatusCode() === 201);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addOrder(Request $request, $shopId){
        $store = $this->appService->getStoreDetails($shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/orders.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        $orderData = $request->json()->all();

        try {
            $response = $this->client->request('POST', $url, [
                'headers' => $headers,
                'json' => $orderData,
            ]);

            return ($response->getStatusCode() === 200 || $response->getStatusCode() === 201);
        }
        catch (\Exception $e) {
            throw $e;
        }

    }

    public function deleteOrder($shopId, $orderId)
    {
        $store = $this->appService->getStoreDetails($shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/orders/{$orderId}.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('DELETE', $url, [
                'headers' => $headers
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getCountries($shopId)
    {
        $store = $this->appService->getStoreDetails($shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/countries.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('GET', $url, [
                'headers' => $headers
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getRegions($shopId, $countryId)
    {
        $store = $this->appService->getStoreDetails($shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/countries/{$countryId}/regions.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];

        try {
            $response = $this->client->request('GET', $url, [
                'headers' => $headers
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addRefund(Request $request)
    {

        $refundDetails = $request->only(['lineItemId', 'lineItemQty', 'refundAmount', 'refundReason', 'orderId', 'shopId']);

        $orderId = $refundDetails['orderId'];
        $payload = [
            'refund' => [
                'orderId' => $orderId,
                'refund_line_items' => [
                    [
                        'line_item_id' => $refundDetails['lineItemId'],
                        'quantity' => $refundDetails['lineItemQty']
                    ]
                    ],
                'note' => $refundDetails['refundReason']
            ]
        ];
        
        try {
            
            $store = $this->appService->getStoreDetails($refundDetails['shopId']);
            $this->shop = $store->shopify_domain;
            $this->token = $store->shopify_token;
            $url = "{$this->shop}/admin/api/2024-04/orders/$orderId/refunds.json"; // URL for updating a specific customer
            $headers = [
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $this->token,
            ];

            $response = $this->client->request('POST', $url, [
                'headers' => $headers,
                'json' => $payload,
            ]);
            return ($response);
        } catch (\Exception $e) {
            return ($e->getMessage());
        }
    }

    public function fullRefund(Request $request)
    {
        $refundDetails = $request->only(['orderId', 'refundAmount', 'shopId', 'lineItems', 'reason']);

        $orderId = $refundDetails['orderId'];
        $payload = [
            'refund' => [
                'currency' => 'PHP', // Adjust currency if necessary
                'refund_line_items' => [],
                'note' => $refundDetails['reason']

            ]

        ];
        foreach ($request->lineItems as $item) {
            $payload['refund']['refund_line_items'][] = [
                'line_item_id' => $item['id'],
                'quantity' => $item['quantity'],
                'restock' => false, // Adjust as necessary
            ];
        }
        
        try {
            
            $store = $this->appService->getStoreDetails($refundDetails['shopId']);
            $this->shop = $store->shopify_domain;
            $this->token = $store->shopify_token;
            $url = "{$this->shop}/admin/api/2024-04/orders/$orderId/refunds.json"; // URL for updating a specific customer
            $headers = [
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $this->token,
            ];

            $response = $this->client->request('POST', $url, [
                'headers' => $headers,
                'json' => $payload,
            ]);
            return ($response);
        } catch (\Exception $e) {
            return ($e->getMessage());
        }
    }
}
