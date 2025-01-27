<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Report;
use Illuminate\Http\Request;
use App\Events\NewReportCreated;
use App\Models\User;
use App\Models\Chirp;
use Illuminate\Support\Facades\Gate;

class ReportController extends Controller
{
    // User submit report
    public function store(Request $request)
    {
        $request->validate([
            'reportable_id' => 'required',
            'reportable_type' => 'required|in:App\Models\Chirp,App\Models\User',
            'reason' => 'required|string|max:500'
        ]);

        $report = Report::create([
            'reporter_id' => auth()->id(),
            'reportable_id' => $request->reportable_id,
            'reportable_type' => $request->reportable_type,
            'reason' => $request->reason
        ]);

        // Kirim notifikasi ke admin (akan kita buat di langkah berikutnya)
        event(new NewReportCreated($report));

        return redirect()->back()->with('success', 'Report submitted successfully!');
    }

    // Admin view reports
    public function index()
    {
        $reports = Report::with(['reporter', 'reportable'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'filters' => request()->all(['search'])
        ]);
    }

    // Admin view single report
    public function show(Report $report)
    {
        $this->authorize('view', $report);

        return Inertia::render('Admin/Reports/Show', [
            'report' => $report->load(['reporter', 'reportable'])
        ]);
    }

    // Admin take action
    public function resolve(Request $request, Report $report)
    {
        $this->authorize('resolve', $report);

        $request->validate(['action' => 'required|in:delete_content,disable_account']);

        if ($request->action === 'delete_content' && $report->reportable instanceof Chirp) {
            $report->reportable->delete();
        } elseif ($request->action === 'disable_account' && $report->reportable instanceof User) {
            $report->reportable->update(['is_banned' => true]);
        }

        $report->update(['status' => 'resolved']);

        return redirect()->route('admin.reports.index')->with('success', 'Action completed!');
    }
}