<?php

namespace App\Http\Controllers;

use App\Models\Stores;
use App\Services\AppService;
use GuzzleHttp\Client;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ShopifyController extends Controller
{

    protected $appService;

    public function __construct(AppService $appService)
    {
        $this->appService = $appService;
    }

    public function getStores(){
        return $this->appService->getStores();
    }

    public function getStoreDetails($id){
        return $this->appService->getStoreDetails($id);
    }

    public function create(Request $request){
        $stores = Stores::all();
        return Inertia::render('CreateStore', [
            'stores' => $stores
        ]);
    }

    public function destroy(Request $request){
        $store = Stores::findOrFail($request->id);

        $store->delete();

        $stores = Stores::all();
        return Inertia::render('CreateStore', [
            'stores' => $stores,
            'onSuccess' => "Store deleted successfully!"]);
    }

    public function updateStore(Request $request, Stores $store){
        $validatedData = $request->validate([
            'shopify_name' => 'required|string',
            'shopify_domain' => 'required|string',
            'shopify_key' => 'required|string',
            'shopify_secret' => 'required|string',
            'shopify_token' => 'required|string',
            'shopify_description' => 'required|string'.$store->id,
            // Add validation rules for other fields as needed
        ]);

        try {
            $store = Stores::findOrFail($request->id);

            // Update the store with the validated data
            $store->update($validatedData);

            $stores = Stores::all();

            return Inertia::render('CreateStore', [
            'stores' => $stores,
            'onSuccess' => "Store Updated Successfully!"]);
            // return redirect()->back()->with('success', 'Store updated successfully');
            // return response()->json(['success' => true, 'message' => 'Note added successfully']);

            // return redirect()->back()->with('success', 'Store updated successfully');



        }catch(\GuzzleHttp\Exception\RequestException $e){
            // return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
            // throw $
            $stores = Stores::all();

            return Inertia::render('CreateStore', [
            'stores' => $stores,
            'onSuccess' => "Store Update Failed!"]);
        }
        

    }

    public function store(Request $request)
    {
        $request->validate([
            'shopify_name' => 'required|string',
            'shopify_domain' => 'required|string',
            'shopify_key' => 'required|string',
            'shopify_secret' => 'required|string',
            'shopify_token' => 'required|string',
            'shopify_description' => 'required|string',
        ]);

        Stores::create([
            'shopify_name' => $request->shopify_name,
            'shopify_domain' => $request->shopify_domain,
            'shopify_key' => $request->shopify_key,
            'shopify_secret' => $request->shopify_secret,
            'shopify_token' => $request->shopify_token,
            'shopify_description' => $request->shopify_description,
        ]);

        
        $stores = Stores::all();

        return Inertia::render('CreateStore', [
            'stores' => $stores,
            'onSuccess' => "Store Created Successfully!"]);
    }
    
    public function getShopifyCountries($storeId){
        return $this->appService->getShopifyCountries($storeId);
    }
}
?>