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
    public static function index()
    {

        return view('administration/topics',
            ['topics' => Topic::all(),
                'sections' => Section::all()->toArray(),
                'locations' => Location::all()->toArray(), "search" => ""]);
    }

    public function update(Request $request, $id)
    {
        $content = Topic::find($id);
        $content->update([
            'title' => $request->input('title') ?? '',
            'description' => $request->input('description') ?? '',
            'bg_color' => $request->input('bg_color') ?? '',
            'image' => $request->input('image') ?? '',
            'section_id' => $request->input('section_id') ?? 1,
            'location_id' => $request->input('location_id') ?? 3,
            'url' => $request->input('url') ?? ''
        ]);

        return $this->index();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'section_id' => 'required',
            'location_id' => 'required'
        ]);

        $topic = Topic::create(
            [
                'title' => $request->input('title') ?? '',
                'description' => $request->input('description') ?? '',
                'link' => $request->input('link') ?? '',
                'url' => $request->input('url') ?? '',
                'bg_color' => $request->input('bg_color') ?? '',
                'image' => '',
                'section_id' => $request->input('section_id'),
                'location_id' => $request->input('location_id')
            ]
        );

        return response()->json($topic, 200);
    }

    public function topicsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return AdminTopicsController::index();
        } else {

            $data = Topic::whereRaw('LOWER(`title`) LIKE ? ', [trim(strtolower($search)) . '%'])->get();

            return view('administration/topics', ["topics" => $data, "search" => $search]);
        }
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
