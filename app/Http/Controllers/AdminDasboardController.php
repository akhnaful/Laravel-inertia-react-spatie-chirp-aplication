<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AdminDasboardController extends Controller
{
    public function dashboard(Request $request)
{
    $filter = $request->query('timeFilter', 'daily');
    
    $stats = [
        'activeUsers' => User::active()->count(),
        'totalChirps' => Chirp::filterByTime($filter)->count(),
        'violationReports' => Report::filterByTime($filter)->count(),
    ];

    return Inertia::render('Dashboard', [
        'stats' => $stats
    ]);
}
}