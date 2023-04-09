<?php

namespace App\Http\Controllers;

class LandingController extends Controller
{
    function index()
    {
        return response([
            'sections' => SectionController::index(),
            'searchTags' => SearchTagController::index(),
        ], 200);
    }
}
