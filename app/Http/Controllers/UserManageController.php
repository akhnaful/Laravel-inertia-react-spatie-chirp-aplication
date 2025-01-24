<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;;
use Inertia\Inertia;
use Illuminate\Http\Request;


class UserManageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::withCount('chirps')->get();
        return Inertia::render('Admin/UserManage', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, User $user)
    {
        $user->update(['status' => $request->status]);
        return back()->with('success', 'User status updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
