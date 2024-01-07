<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $guards = array_keys(config('auth.guards'));
        $user = null;
        foreach ($guards as $guard) {

            $currentGuard = Auth::guard($guard);
            
            if($currentGuard->check()) {
                $user = $currentGuard->user();
                break;
            }
        };
        
        $request->session()->regenerate();

        /* hna ghadi ncréyiw wahd token l kol guard(user,admin,teacher) w khass n7awlo had response l json 
        w khass nzido f model admin w teacher had le trait "HasApiTokens" ila mazednahche maghatkhdamch 
        had createToken w db mnin drna had token ghanwliw ntchekiw status === 200 w machi 204
        */
        if($user) {
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('api',[$user->getRoleAttribute()])->plainTextToken,
                /* hna had api howa name dial token w dak l role howa abbilities had abbilities b7al galti 
                   middleware
                */
            ]);
        }
        else {
            return response()->json(['error' => 'User not found'], 401);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $guards = array_keys(config('auth.guards'));
        $user = null;
        foreach ($guards as $guard) {

            $currentGuard = Auth::guard($guard);
            
            if($currentGuard->check()) {
                $user = $currentGuard->user();
                break;
            }
        };

        if($user) {
            $user->tokens()->delete();
        }
        else {
            return response()->json(['error' => 'User not found'], 401);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
