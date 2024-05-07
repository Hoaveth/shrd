<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stores extends Model
{
    use HasFactory;

    protected $table = 'stores';

    protected $fillable = [
        'shopify_name',
        'shopify_description',
        'shopify_domain',
        'shopify_key',
        'shopify_secret',
        'shopify_token'
    ];
}
