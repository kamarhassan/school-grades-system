<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * تسجيل حساب جديد
     */
    // public function register(RegisterRequest $request)
    // {
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //     ]);

    //     // اختيارياً: إسناد دور supervisor تلقائياً عند التسجيل
    //     $user->assignRole('supervisor'); 

    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'تم إنشاء الحساب بنجاح',
    //         'access_token' => $token,
    //         'token_type' => 'Bearer',
    //         'user' => $user
    //     ], 201);
    // }

    /**
     * تسجيل الدخول وجلب الـ Token
     */
    public function login(LoginRequest $request)
    {
       
        $user = User::where('email', $request->email)->first();

        // التحقق من صحة كلمة المرور
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات الاعتماد غير صحيحة، يرجى التأكد من كلمة المرور.'
            ], 401); // إيقاف العملية هنا وإرجاع خطأ غير مصرح به
        }

        // إنشاء التوكن الخاص بـ Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getAllPermissions()->pluck('name') // جلب الأدوار الخاصة به (Admin / Supervisor)
            ]
        ], 200);
    }

    /**
     * جلب بيانات المستخدم المسجل حالياً
     */
    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'permissions' => $user->getAllPermissions()->pluck('name')
            ]
        ], 200);
    }

    /**
     * تسجيل الخروج وحذف الـ Token الحالي
     */
    public function logout(Request $request)
    {
        // حذف التوكن الحالي الذي تم استخدامه في الطلب
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح'
        ], 200);
    }
}
