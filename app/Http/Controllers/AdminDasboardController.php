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
        
        // Data utama
        $stats = [
            'activeUsers' => User::active()->count(),
            'totalChirps' => Chirp::filterByTime($filter)->count(),
            'violationReports' => Report::filterByTime($filter)->count(),
        ];
    
        // Data untuk chart
        $chartData = [
            'labels' => [],
            'activeUsers' => [],
            'totalChirps' => [],
            'violationReports' => [],
        ];
    
        // Generate labels dan data berdasarkan filter
        switch ($filter) {
            case 'daily':
                $days = 7;
                for ($i = $days; $i >= 0; $i--) {
                    $date = now()->subDays($i);
                    $chartData['labels'][] = $date->format('D, M j');
                    
                    $chartData['activeUsers'][] = User::whereDate('last_active_at', $date)->count();
                    $chartData['totalChirps'][] = Chirp::whereDate('created_at', $date)->count();
                    $chartData['violationReports'][] = Report::whereDate('created_at', $date)->count();
                }
                break;
                
            case 'weekly':
                $weeks = 12;
                for ($i = $weeks; $i >= 0; $i--) {
                    $start = now()->subWeeks($i)->startOfWeek();
                    $end = now()->subWeeks($i)->endOfWeek();
                    $chartData['labels'][] = 'Week '.$start->format('W');
                    
                    $chartData['activeUsers'][] = User::whereBetween('last_active_at', [$start, $end])->count();
                    $chartData['totalChirps'][] = Chirp::whereBetween('created_at', [$start, $end])->count();
                    $chartData['violationReports'][] = Report::whereBetween('created_at', [$start, $end])->count();
                }
                break;
                
            case 'monthly':
                $months = 6;
                for ($i = $months; $i >= 0; $i--) {
                    $date = now()->subMonths($i);
                    $chartData['labels'][] = $date->format('M Y');
                    
                    $chartData['activeUsers'][] = User::whereMonth('last_active_at', $date)->count();
                    $chartData['totalChirps'][] = Chirp::whereMonth('created_at', $date)->count();
                    $chartData['violationReports'][] = Report::whereMonth('created_at', $date)->count();
                }
                break;
        }
        
        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData 
        ]);
    }
}