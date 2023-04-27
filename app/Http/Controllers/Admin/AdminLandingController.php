<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Topic;
use Inertia\Inertia;

class AdminLandingController extends Controller
{
    function index()
    {
        return response([
            'countOfSections' => Section::count(),
            'countOfTopics' => Topic::count(),
        ]);
    }
}
