<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Section;
use App\Models\Topic;
use Inertia\Inertia;

class AdminLandingController extends Controller
{
    function index()
    {
        return Inertia::render('Dashboard',[
            'countOfSections' => Section::count(),
            'countOfTopics' => Topic::count(),
            'countOfLocations' => Location::count(),
        ]);
    }
}
