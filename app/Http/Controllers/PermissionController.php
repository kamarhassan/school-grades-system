<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PermissionController extends Controller
{
     public function grades(Request $request)
    {
        return $request->user()->grades;
    }
}
