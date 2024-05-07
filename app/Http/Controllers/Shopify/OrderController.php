<?php
namespace App\Http\Controllers\Shopify;

use App\Http\Controllers\Controller;
use App\Services\AppService;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Redirect;
use App\Services\OrderService;
use App\Services\ProductService;

class OrderController extends Controller
{

    protected $orderService;
    protected $productService;
    protected $appService;

    protected $customerService;


    public function __construct(OrderService $orderService, ProductService $productService, AppService $appService, CustomerService $customerService)
    {
        $this->orderService = $orderService;
        $this->productService = $productService;
        $this->appService = $appService;
        $this->customerService = $customerService;
    }

    public function showOrders(Request $request, $shopId)
    {
        $customerId = $request->query('customer_id');
        // $shopId = $request->query('shop');
        try {
            $orders = $this->orderService->getAllOrders($customerId, $shopId);

            return Inertia::render('Orders', ['orders' => $orders]);
        } catch (\Exception $e) {
            // Handle exceptions here, such as logging the error and showing an error page or message
            return Inertia::render('Orders', 
            [
                'errors' => $e->getMessage(),
                'orders' => [],
                'appName' => ''
            ]);
        }
    }

    // public function showOrdersByStore(Request $request, $storeId)
    // {
    //     $customerId = $request->query('customer_id');
    //     try {
    //         $orders = $this->orderService->getAllOrders($customerId);
    //         return Inertia::render('Orders', ['orders' => $orders]);
    //     } catch (\Exception $e) {
    //         // Handle exceptions here, such as logging the error and showing an error page or message
    //         return Inertia::render('Orders', 
    //         [
    //             'errors' => $e->getMessage(),
    //             'orders' => [],
    //             'appName' => ''
    //         ]);
    //     }
    // }

    public function showOrder(Request $request)
    {
        $orderId = $request->query('order_id');
        $shopId = $request->query('shop_id');
        try {
            $result = $this->orderService->getOrderDetailsWithProducts($orderId, $shopId);
            
            return Inertia::render('OrderDetails', [
                'order' => $result['order'],
                'products' => $result['products'],
                'events' => $result['events'],
                'shop' => $result['shop'],
            ]);

        } catch (\Exception $e) {

            return Inertia::render('OrderDetails', 
            [
                'errors' => $e->getMessage(),
                'order' => [],
                'products' => [],
                'events' => [],
                'shop' => []
            ]);
        }
    }

    public function updateNote(Request $request){
        // return response()->json(['success' => true, 'message' => 'Note added successfully']);
        try {
            if($this->orderService->updateNote($request)){
                return response()->json(['success' => true, 'message' => 'Note added successfully']);
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateOrder(Request $request){
        // return response()->json($request);
        try {
            if($this->orderService->updateOrder($request)){
                return redirect()->back()->with(['onSuccess' => 'Refunded Successfully!']);
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return redirect()->back()->with('onError', 'User Updated Successfully!');
        }
    }

    public function create(Request $request, $shopId, $customerId){
        try{
            $products = $this->productService->fetchProducts($shopId);
            $customers = $this->customerService->fetchCustomerById($customerId, $shopId);

            // return $products;
            return Inertia::render('CreateOrder',[
                'products' => $products,
                'customer' => $customers
            ]);
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return Inertia::render('CreateOrder',[
                'products' => [],
                'errors' => [$e->getMessage()],
                'customer' => []
            ]);
        }
    }
    
    public function store(Request $request, $shopId, $customerId){
        try{
            $products = $this->productService->fetchProducts($shopId);
            $customers = $this->customerService->fetchCustomerById($customerId, $shopId); 
            $this->orderService->addOrder($request, $shopId);
            return Inertia::render('CreateOrder',[
                'products' => $products,
                'customer' => $customers
            ]);
        }catch(\GuzzleHttp\Exception\RequestException $e) {
            return Inertia::render('CreateOrder', [
                'errors' => [$e->getMessage()],
                'customer' => [],
                'products' => [],
                // Other data if necessary
            ]);
        }
    }

    public function delete(Request $request, $shopId, $orderId, $customerId){
        try{
            if($this->orderService->deleteOrder($shopId, $orderId)){
                $customerData = $this->customerService->fetchCustomerById($customerId, $shopId);
                $ordersData = $this->orderService->getOrdersByCustomerId($customerId, $shopId);
                $shopData = $this->appService->getStoreDetails($shopId);
    
                // return response()->json(['message' => 'Success message'], 200);

                return Inertia::render('CustomerDetails', [
                    'customer' => $customerData,
                    'orders' => $ordersData,
                    'shop' => $shopData,
                    'storeId' => $shopId,
                    'events' => [],
                    'onSuccess' => "Success deleting order."
                ]);
            }else{
                $customerData = $this->customerService->fetchCustomerById($customerId, $shopId);
                $ordersData = $this->orderService->getOrdersByCustomerId($customerId, $shopId);
                $shopData = $this->appService->getStoreDetails($shopId);
    
                // return response()->json(['message' => 'Success message'], 200);

                return Inertia::render('CustomerDetails', [
                    'customer' => $customerData,
                    'orders' => $ordersData,
                    'shop' => $shopData,
                    'storeId' => $shopId,
                    'events' => [],
                    'omSuccess' => "Success deleting order."
                ]);
            }
        }catch(\GuzzleHttp\Exception\RequestException $e) {
            return Inertia::render('CustomerDetails', [
                'customer' => [],
                'orders' => [],
                'shop' => [],
                'events' => [],
                'storeId' => '',
                'errors' => [$e->getMessage()],
            ]);
        }
    }

    public function addRefund(Request $request){
        // return response()->json(['success' => true, 'message' => 'Note added successfully']);

        $refundDetails = $request->only(['lineItemId', 'lineItemQty', 'refundAmount', 'refundReason', 'orderId', 'shopId']);

        $orderDetails = $this->orderService->getOrderDetailsWithProducts($refundDetails['orderId'], $refundDetails['shopId']);

        try {
            $response = $this->orderService->addRefund($request);
            if($response){
                return redirect()->back()->with(['onSuccess' => 'Refunded Successfully!', 'orderDetails' => $orderDetails]);
            }else{
                return redirect()->back()->with('onError', 'User Updated Successfully!');
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return redirect()->back()->with('onError', $e->getMessage());
        }
    }

    public function fullRefund(Request $request){
        try {
            $response = $this->orderService->fullRefund($request);
            if($response){
                return redirect()->back()->with('onSuccess', 'User Updated Successfully!');
            }else{
                return redirect()->back()->with('onError', 'User Updated Successfully!');
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return redirect()->back()->with('onError', $e->getMessage());
        }
    }

    public function getCountries($storeId){
        try {
            $response = $this->orderService->getCountries($storeId);
            if($response){
                return $response;
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            return redirect()->back()->with('onError', $e->getMessage());
        }
    }

    public function getRegions($storeId, $countryId){
        try {
            $response = $this->orderService->getRegions($storeId, $countryId);
            if($response){
                return $response;
            }
        }catch(\GuzzleHttp\Exception\RequestException $e){
            // return redirect()->back()->with('onError', $e->getMessage());
        }
    }


}
