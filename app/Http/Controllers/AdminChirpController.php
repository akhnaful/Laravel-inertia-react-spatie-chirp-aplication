<?php

namespace App\Http\Controllers;

use Log;
use Inertia\Inertia;
use App\Models\Chirp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\RedirectResponse;

class AdminChirpController extends Controller
{
    public function index()
    {
        $chirps = Chirp::with('user')->get();
        return Inertia::render('Admin/ChirpManager', [
            'chirps' => $chirps
        ]);
    }

    public function destroy(Chirp $chirp): RedirectResponse
    {
        // Otorisasi delete untuk admin dan pengguna terkait
        Gate::authorize('delete', $chirp);

        $chirp->delete();
        return redirect()->back()->with('success', 'Chirp deleted successfully.');
    }

    public function markAsReviewed(Request $request, Chirp $chirp): RedirectResponse
    {
        // Otorisasi update untuk admin dan pengguna terkait

        Gate::authorize('update', $chirp);

        $chirp->update([
            'is_reviewed' => true,
        ]);

        return redirect()->back()->with('success', 'Chirp marked as reviewed.');
    }
}