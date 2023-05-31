<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTopicsController extends Controller
{
    public function index()
    {
        return ['topics' => Topic::all(),
            'sections' => Section::all(),
            'locations' => Location::all()];
    }

    public function update(Request $request, $id)
    {
        $content = Topic::find($id);
        $content->update([
            'title' => $request->input('title') ?? $content->title ?? '',
            'description' => $request->input('description') ?? $content->description ?? '',
            'bg_color' => $request->input('bg_color') ?? $content->bg_color ?? '',
            'image' => $request->input('image') ?? $content->image ?? '',
            'section_id' => $request->input('section_id') ?? $content->section_id ?? 1,
            'location_id' => $request->input('location_id') ?? $content->location_id ?? 3,
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

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return int
     */
    public function destroy($id)
    {
        return Topic::destroy($id);
    }
}
