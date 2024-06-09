<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use function Termwind\render;

class UsersController extends Controller
{
    public static function index()
    {
        return Inertia::render('Admin/Users',
            ['paginationUsers' => User::with('roles')->paginate(10), "search" => ""]);
    }

    public function usersSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return UsersController::index();
        } else {

            $data = User::where('name', 'LIKE', '%' . trim(strtolower($search)) . '%')->paginate(10);

            return Inertia::render('Admin/Users', ["paginationUsers" => $data, "search" => $search]);
        }
    }

}
