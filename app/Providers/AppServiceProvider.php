<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        $this->app->singleton(ProductService::class, function ($app) {
            return new ProductService();
        });

        $this->app->singleton(OrderService::class, function ($app) {
            return new OrderService();
        });

        $this->app->singleton(CustomerService::class, function ($app) {
            return new CustomerService();
        });

        $this->app->singleton(UtilService::class, function ($app) {
            return new UtilService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
