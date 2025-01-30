<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ReportManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/Reports/Index", ['reports' => Report::with('reporter')->with('reported')->latest()->get()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        
        $report->delete();
        return redirect(route('report.index'));
        
    }

    /**
     * delete the reported content.
     */
    public function update(Report $report)
    {
        
        $reported = $report->reported();
        if ($report->reported_type == User::class) {
            $reported->update([
                'status' => 'banned'
            ]);
        } else {
            $reported->delete();
        }
        return redirect()->back()->with(['success' => 'User updated successfully.']);
    }
}
