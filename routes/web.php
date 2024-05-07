<?php

use App\Http\Controllers\CallController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Shopify\CustomerController;
use App\Http\Controllers\Shopify\OrderController;
use App\Http\Controllers\Shopify\ProductController;
use App\Http\Controllers\ShopifyController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [HomeController::class, 'index']);

Route::group(['middleware' => ['auth', 'verified']], function() {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('home.dashboard');
    Route::get('/calls', [CallController::class, 'index'])->name('calls.index');
    //Customers
    Route::get('/customers', [CustomerController::class, 'showCustomers'])->name('customers.index');
    Route::get('/customers-api', [CustomerController::class, 'getCustomers']);
    Route::post('/customers', [CustomerController::class, 'addCustomer']);
    Route::put('/customers/{customerId}/{storeId}', [CustomerController::class, 'updateCustomer']);
    Route::post('/customers/delete', [CustomerController::class, 'deleteCustomers']);
    Route::get('/customer/{customerId}/{storeId}', [CustomerController::class, 'getCustomer']);
    Route::get('/customers-search', [CustomerController::class, 'searchCustomers']);
    Route::put('/customer/update-note', [CustomerController::class, 'updateNote']);

    //Orders
    Route::get('/orders/{storeId}', [OrderController::class, 'showOrders'])->name('orders.index');
    // Route::get('/orders/{storeId}', [OrderController::class, 'showOrdersByStore'])->name('orders.index');
    Route::get('/order', [OrderController::class, 'showOrder']);
    Route::get('/create-application-charge', [ShopifyController::class, 'createApplicationCharge']);
    Route::put('/order/update-note', [OrderController::class, 'updateNote']);
    Route::get('/order/create/{shopId}/{customerId}', [OrderController::class, 'create']);
    Route::post('/order/create/{shopId}/{customerId}', [OrderController::class, 'store']);
    Route::post('/order/delete/{shopId}/{orderId}/{customerId}', [OrderController::class, 'delete']);
    Route::post('/order/create-refund', [OrderController::class, 'addRefund']);
    Route::put('/order/update', [OrderController::class, 'updateOrder']);
    Route::post('/order/full-refund', [OrderController::class, 'fullRefund']);

    //Shopify
    Route::get('/stores', [ShopifyController::class, 'getStores']);
    Route::get('/store-details/{storeId}', [ShopifyController::class, 'getStoreDetails']);
    Route::get('/create-store', [ShopifyController::class, 'create'])->name('create-store');;
    Route::post('/create-store', [ShopifyController::class, 'store']);
    Route::put('/update-store', [ShopifyController::class, 'updateStore']);
    Route::post('/delete-store', [ShopifyController::class, 'destroy']);
    Route::get('/countries/{storeId}', [OrderController::class, 'getCountries']);
    Route::get('/regions/{storeId}/{countryId}', [OrderController::class, 'getRegions']);

    //CreateUser
    Route::get('/create-user', [UserController::class, 'create']);
    Route::post('/create-user', [UserController::class, 'store']);
    Route::get('/get-users', [UserController::class, 'getAllUsers']);
    Route::post('/delete-user', [UserController::class, 'destroy']);
    Route::put('/update-user', [UserController::class, 'updateUser']);

    //Products
    Route::get('/products/{shopId}', [ProductController::class, 'getProducts']);

});



require __DIR__.'/auth.php';
