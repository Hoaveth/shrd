<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create(Request $request)
    {
        $users = User::all();
        return Inertia::render('CreateUser', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $users = User::all();

        return Inertia::render('CreateUser', [
            'onSuccess' => "User Created Successfully!",
            'users' => $users]);
    }

    public function destroy(Request $request){
        $user = User::findOrFail($request->id);

        $user->delete();

        return redirect()->back()->with('onSuccess', 'User Deleted Successfully!');
    }

    public function updateUser(Request $request, User $user){
        
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'email' => 'required|string|email|max:255'.$user->id,
        ]);
        
        try {
            $user = User::findOrFail($request->id);

            if($request->email !== $user->email){
                $request->validate([
                    'email' => 'required|string|email|max:255|unique:users'
                ]);
            }
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);

            $user->save();

            $users = User::all();

            return redirect()->back()->with('onSuccess', 'User Updated Successfully!');

        }catch(\GuzzleHttp\Exception\RequestException $e){
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}

