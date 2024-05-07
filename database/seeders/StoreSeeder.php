<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stores')->insert([
            'shopify_name' => "Kim's Grocery Store",
            'shopify_description' => 'This is an example store.',
            'shopify_domain' => 'https://kims-grocery-store.myshopify.com',
            'shopify_key' => 'e0e8d2a9cf243a484bd89b03a7a7e13b',
            'shopify_secret' => '36a492f1f66f819fddf9aa6a93243249',
            'shopify_token' => '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',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('stores')->insert([
            'shopify_name' => "James's Grocery Store",
            'shopify_description' => 'This is an example store.',
            'shopify_domain' => 'https://323c63-de.myshopify.com',
            'shopify_key' => 'ad7d256cdf4138ecf9f65a8147ba7186',
            'shopify_secret' => '5fefa82ca946e2158ff994b90712ff34',
            'shopify_token' => 'da41b141e07811aae4e039b3e2a7d90d',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
