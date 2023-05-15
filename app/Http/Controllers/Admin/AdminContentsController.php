<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentsController extends Controller
{
    public function index()
    {
        return Topic::all();
    }

    public function update(Request $request, $id)
    {
        $content = Topic::find($id);
        $content->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'bg_color' => $request->input('bg_color') ?? '',
        ]);

        return $this->index();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'link' => 'required',
            'bgColor' => 'required',
            'section_id' => 'required'
        ]);

        $topic = Topic::create(
            [
                'title' => $request->input('title') ?? '',
                'description' => $request->input('description') ?? '',
                'link' => $request->input('link') ?? '',
                'bg_color' => $request->input('bgColor') ?? '',
                'image' => '',
                'section_id' => $request->input('section_id'),
                'location_id' => 3
            ]
        );

        return response()->json($topic, 200);
    }

}
