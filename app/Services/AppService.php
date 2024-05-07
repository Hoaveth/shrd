<?php
namespace App\Services;

use App\Models\Stores;
use GuzzleHttp\Client;
use App\Services\UtilService;
use Illuminate\Http\Request;

class AppService
{
    protected $shop;
    protected $token;
    protected $client;
    protected $utilService;

    public function __construct(UtilService $utilService)
    {
        $this->shop = env('SHOPIFY_STORE_DOMAIN');
        $this->token = env('SHOPIFY_API_TOKEN');
        $this->client = new Client();
        $this->utilService = $utilService;
    }


    public function getShopDetails($storeId)
    {
        $store = $this->getStoreDetails($storeId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $url = "{$this->shop}/admin/api/2024-04/shop.json";
        $headers = [
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $this->token,
        ];
        try {
            $response = $this->client->request('GET', $url, ['headers' => $headers]);

            if ($response->getStatusCode() === 200) {
                return json_decode($response->getBody()->getContents(), true)['shop'];
            } else {
                // Handle non-successful response
                throw new \Exception('API Request Failed with status code: ' . $response->getStatusCode());
            }
        } catch (\Exception $e) {
            // Handle the exception (log it, throw it, or return a user-friendly error)
            throw $e;
        }
    
    }

    public function getStores(){
        $stores = Stores::all();
        return $stores;
    }

    public function getStoreDetails($id){
        $store = Stores::findOrFail($id);
        return $store;
    }

    public function getFirstStore(){
        $store = Stores::first();
        return $store;
    }

}
