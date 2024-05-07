<?php
namespace App\Http\Controllers\Shopify;

use App\Http\Controllers\Controller;
use App\Services\AppService;
use App\Services\OrderService;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class CustomerController extends Controller
{

    protected $customerService;
    protected $orderService;
    protected $appService;

    public function __construct(CustomerService $customerService, OrderService $orderService, AppService $appService)
    {
        $this->customerService = $customerService;
        $this->orderService = $orderService;
        $this->appService = $appService;
    }

    public function getCustomer(Request $request, $customerId, $shopId)
    {
        try {
            $customerData = $this->customerService->fetchCustomerById($customerId, $shopId);
            $ordersData = $this->orderService->getOrdersByCustomerId($customerId, $shopId);
            $shopData = $this->appService->getStoreDetails($shopId);
            $countries = $this->orderService->getCountries($shopId);

            return Inertia::render('CustomerDetails', [
                'customer' => $customerData,
                'orders' => $ordersData,
                'shop' => $shopData,
                'storeId' => $shopId,
                'countries' => $countries,
                'events' => []
            ]);

        } catch (\Exception $e) {
            return Inertia::render('CustomerDetails', [
                'customer' => [],
                'orders' => [],
                'shop' => [],
                'events' => [],
                'storeId' => '',
                'countries' => [],
                'errors' => [$e->getMessage()],
            ]);
        }
    }

    public function showCustomers(Request $request)
    {
        $firstStore = $this->appService->getFirstStore();

        $searchParams = $request->only(['customer_id', 'first_name', 'last_name', 'email', 'phone', 'zip', 'province', 'store_name']);
       

        $result = $this->customerService->getDefaultCustomers($request, $firstStore->id);
        $shopData = $this->appService->getStoreDetails($firstStore->id);
        $stores = $this->appService->getStores();

        return Inertia::render('Customers', [
            'customers' => $result,
            'query' => $searchParams,
            'shop' => $shopData,
            'stores' => $stores,
            'testData' => $firstStore->id,
        ]);
    }

    public function searchCustomers(Request $request){

        $result = $this->customerService->getCustomers($request);

        return $result;
    }

    public function addCustomer(Request $request)
{
        try {
            if($this->customerService->addCustomer($request))
            {
                sleep(10);
                $updatedCustomerData = $this->customerService->getDefaultCustomers(new Request(), $request->shop);
                $shopData = $this->appService->getStoreDetails($request->shop);
                $stores = $this->appService->getStores();
                return Inertia::render('Customers', [
                    'customers' => $updatedCustomerData,
                    'shop' => $shopData,
                    'stores' => $stores,
                    'testData' => $request->shop,
                ]); 
            }
            else {
                return Inertia::render('Customers', [
                    'customers' => [], // Or the current customer data
                    'shop' => '',
                    'stores' => [],
                    'errors' => ['API Request Failed'],
                    // Other data if necessary
                ]);
            }
        } 
        catch (\GuzzleHttp\Exception\RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                $statusCode = $response->getStatusCode();
                $body = $response->getBody();
                $content = $body->getContents(); 
                $errorMessages = json_decode($content, true);
        
                return Inertia::render('Customers', [
                    'customers' => [], // Or the current customer data
                    'errors' => $errorMessages,
                    // Other data if necessary
                ]);
            } else {
                return Inertia::render('Customers', [
                    'customers' => [], // Or the current customer data
                    'errors' => [$e->getMessage()],
                    // Other data if necessary
                ]);
            }
        }
        catch (\GuzzleHttp\Exception\GuzzleException $e) {
            return Inertia::render('Customers', [
                'customers' => [], // Or the current customer data
                'errors' => [$e->getMessage()]
            ]);
        }
    }

    public function updateCustomer(Request $request, $customerId, $storeId)
    {
        try {
            if($this->customerService->updateCustomer($request, $customerId, $storeId))
            {
                sleep(10);
                $updatedCustomerData = $this->customerService->getCustomers(new Request());
                $shopData = $this->appService->getStoreDetails($storeId);
                $stores = $this->appService->getStores();

                return Inertia::render('Customers', [
                    'customers' => $updatedCustomerData,
                    'shop' => $shopData,
                    'stores' => $stores,    
                ]); 
            }
            else {
                return Inertia::render('Customers', [
                    'customers' => [], // Or the current customer data
                    'shop' => '',
                    'stores' => [],
                    'errors' => ['API Request Failed'],
                    // Other data if necessary
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('Customers', [
                'customers' => [], // Or the current customer data
                'shop' => '',
                'stores' => [],
                'errors' => 'hello',
                // Other data if necessary
            ]);
        }
    }

    public function deleteCustomers(Request $request)
    {
        try{
            if($this->customerService->deleteCustomers($request))
            {
                sleep(10);
                $updatedCustomerData = $this->customerService->getCustomers(new Request());
                $stores = $this->appService->getStores();
                
                return Inertia::render('Customers', [
                    'customers' => $updatedCustomerData,
                    'stores' => $stores
                ]); 
            }
            else {
                return Inertia::render('Customers', [
                    'customers' => [], // Or the current customer data
                    'stores' => [],
                    'errors' => ['API Request Failed'],
                    // Other data if necessary
                ]);
            }
        }
        catch (\Exception $e) {
            return Inertia::render('Customers', [
                'customers' => [], // Or the current customer data
                'stores' => [],
                'errors' => [$e->getMessage()],
                // Other data if necessary
            ]);
        }
        
    }

    public function updateNote(Request $request){
        // return response()->json(['success' => true, 'message' => 'Note added successfully']);
        try {
            if($this->customerService->updateNote($request)){
                return response()->json(['success' => true, 'message' => 'Note added successfully']);
            }else{
                
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
}

?>