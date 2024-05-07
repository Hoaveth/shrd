<?php
namespace App\Services;

use GuzzleHttp\Client;
use App\Services\UtilService;
use Illuminate\Support\Facades\Http;

class ProductService
{
    protected $shop;
    protected $token;
    protected $client;
    protected $utilService;
    protected $appService;

    public function __construct(UtilService $utilService, AppService $appService)
    {
        $this->shop = env('SHOPIFY_STORE_DOMAIN');
        $this->token = env('SHOPIFY_API_TOKEN');
        $this->client = new Client();
        $this->utilService = $utilService;
        $this->appService = $appService;
    }

    protected function findVariantImage(array $product, $variantId)
    {
        foreach ($product['variants'] as $variant) {
            if ($variant['id'] == $variantId && isset($variant['image_id'])) {
                foreach ($product['images'] as $image) {
                    if ($image['id'] == $variant['image_id']) {
                        return $image['src'];
                    }
                }
            }
        }

        // If no specific variant image is found, return the first image of the product
        return $product['images'][0]['src'] ?? null;
    }

    public function extractLineItems($orderData)
    {
        $lineItems = [];

        if (isset($orderData['line_items']) && is_array($orderData['line_items'])) {
            $lineItems = $orderData['line_items'] ?? [];
        }

        return $lineItems;
    }

    public function getProductsWithVariant($productVariantPairs, $shopId)
    {
        $results = [];

        foreach ($productVariantPairs as $pair) {
            $productId = $pair['product_id'] ?? null;
            $variantId = $pair['variant_id'] ?? null;

            try {
                if ($productId !== null) {
                    if($shopId){
                        $store = $this->appService->getStoreDetails($shopId);
                        $this->shop = $store->shopify_domain;
                        $this->token = $store->shopify_token;
                    }
                    // Retrieve the product from Shopify
                    $response = $this->client->request('GET', "{$this->shop}/admin/api/2024-04/products/{$productId}.json", [
                        'headers' => [
                            'Content-Type' => 'application/json',
                            'X-Shopify-Access-Token' => $this->token,
                        ],
                    ]);

                    if (in_array($response->getStatusCode(), [200, 201])) {
                        $productData = json_decode($response->getBody(), true);
                        $product = $productData['product'];

                        $variant = null;
                        if ($variantId !== null) {
                            // Find the corresponding variant
                            foreach ($product['variants'] as $v) {
                                if ($v['id'] == $variantId) {
                                    $variant = $v;
                                    break;
                                }
                            }
                        }

                        // Add the product and variant to the results
                        $results[] = [
                            'product' => $product,
                            'variant' => $variant
                        ];
                    } else {
                        throw new \Exception("Failed to retrieve product: HTTP Status " . $response->getStatusCode());
                    }
                }
            } catch (GuzzleException $e) {
                throw $e;
            }
        }

        return $results;
    }

    public function getProducts($productIds)
    {
        // Ensure $productIds is an array
        if (!is_array($productIds)) {
            $productIds = [$productIds];
        }

        $products = [];

        foreach ($productIds as $productId) {
            try {
                $response = $this->client->request('GET', "$this->shop}/admin/api/2024-04/products/{$productId}.json", [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'X-Shopify-Access-Token' => $this->token,
                    ],
                ]);

                if (in_array($response->getStatusCode(), [200, 201])) {
                    $data = json_decode($response->getBody(), true);
                    $products[] = $data['product'];
                } else {
                    throw new \Exception("Failed to retrieve product: HTTP Status " . $response->getStatusCode());
                }
            } catch (GuzzleException $e) {
                throw $e;
            }
        }

        return $products;
    }

    public function extractProductIds(array $products)
    {
        $productIds = [];

        foreach ($products as $product) {
            // Assuming each product is an array and has a 'product_id' key
            if (isset($product['product_id'])) {
                $productIds[] = $product['product_id'];
            }
        }

        return $productIds;
    }

    public function extractProductAndVariantIds(array $products)
    {
        $productVariantPairs = [];

        foreach ($products as $product) {
            // Initialize with null values
            $productId = null;
            $variantId = null;

            // Check and assign product_id if exists
            if (isset($product['product_id'])) {
                $productId = $product['product_id'];
            }

            // Check and assign variant_id if exists
            if (isset($product['variant_id'])) {
                $variantId = $product['variant_id'];
            }

            // Add the product and variant ID pair to the array
            $productVariantPairs[] = [
                'product_id' => $productId,
                'variant_id' => $variantId
            ];
        }

        return $productVariantPairs;
    }

    function fetchProducts($shopId){
        $store = $this->appService->getStoreDetails($shopId);
        $this->shop = $store->shopify_domain;
        $this->token = $store->shopify_token;

        $response = $this->client->request('GET', "{$this->shop}/admin/api/2024-04/products.json", [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $this->token,
            ],
        ]);

        $productData = json_decode($response->getBody(), true);
        $products = $productData['products'];
        $allVariants = [];

        foreach ($products as $product) {
            $productId = $product['id'];
            
            $variantsResponse = $this->client->request('GET', "{$this->shop}/admin/api/2024-04/products/{$productId}/variants.json", [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-Shopify-Access-Token' => $this->token,
                ],
            ]);
            $variantsData = json_decode($variantsResponse->getBody(), true);
            $variants = $variantsData['variants'];

            $images = $product['images'];

            foreach($variants as $variant) {
                $variant['title'] = $product['title'].' - '.$variant['title'];
                

                $variantImageId = $variant['image_id'];
                $variantImageSrc = null;

                    // If variant image id is null, use product's image id
                    if ($variantImageId === null) {
                        if($product['image'] !== null){
                            $variantImageId = $product['image']['id'];
                            $variantImageSrc = $product['image']['src'];
                        }
                    }
                    if($variantImageSrc == null){
                        foreach ($images as $image) {
                            if ($image['id'] == $variantImageId) {
                                $variantImageSrc = $image['src'];
                            }
                        }
                    }
                    
                $variant['image_id'] = $variantImageId;
                $variant['image_src'] = $variantImageSrc;
                
                $allVariants[] = $variant;
            }
            
            $product['variants'] = $allVariants;
        }

        return $allVariants;
    }


}
