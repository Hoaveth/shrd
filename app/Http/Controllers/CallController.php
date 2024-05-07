<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CallController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Calls/Index', [
            'calls' => []
        ]);
    }
}
