<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSectionsController extends Controller
{
    public function index()
    {
        return response([
            'sections' => Section::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        $section->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            ]);

        return $this->index();
    }
}
