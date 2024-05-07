<?php

namespace App\Http\Controllers\Shopify;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function getProducts(Request $request, $shopId){
        $products = $this->productService->fetchProducts($shopId);
        return Inertia::render('CreateOrder',[
            'products' => $products
        ]);
    }
}
