<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Section;

class LocationsController extends Controller
{
    public static function index()
    {
        return view('administration/locations',
            ['paginationLocations' => Location::paginate(10), "search" => ""]);
    }
}
