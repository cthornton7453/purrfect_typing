<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'isAuthenticated' => Auth::check(),
            'userName' => Auth::user() ? Auth::user()->username : null,
        ]);
    }
}
