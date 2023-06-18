<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Transliterator;

class AdminTopicsController extends Controller
{
    public static function index()
    {

        return view('administration/topics',
            ['topics' => Topic::all(),
                'sections' => Section::all(),
                'locations' => Location::all(), "search" => ""]);
    }

    public function update(Request $request, $id)
    {
        $content = Topic::find($id);

        $sectionId = null;
        $locationId = null;

        foreach ($request->input() as $key => $value)
            if (preg_match('/^section_id/', $key))
                $sectionId = $value;
            else if (preg_match('/^location_id/', $key))
                $locationId = $value;


        $content->update([
            'title' => $request->input('title') ?? '',
            'description' => $request->input('description') ?? '',
            'bg_color' => $request->input('bg_color') ?? isset($content->bg_color) ? $content->bg_color : '#FF9F63',
            'image' => $request->input('image') ?? '',
            'section_id' => $sectionId ?? 1,
            'location_id' => $locationId ?? 3,
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

        $section = Section::find($request->section_id);

        $topic = Topic::create(
            [
                'title' => $request->input('title') ?? '',
                'description' => $request->input('description') ?? '',
                'link' => $this->getLinkFromName($request->input('title')),
                'url' => $request->input('url') ?? '',
                'bg_color' => $section->bg_color,
                'image' => '',
                'section_id' => $request->input('section_id'),
                'location_id' => $request->input('location_id')
            ]
        );

        return $this->index();
    }

    public function topicsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return AdminTopicsController::index();
        } else {

            $data = Topic::whereRaw('LOWER(`title`) LIKE ? ', [trim(strtolower($search)) . '%'])->get();

            return view('administration/topics', ["topics" => $data, "search" => $search,
                'sections' => Section::all(),
                'locations' => Location::all()]);
        }
    }

    public function delete(Request $request, $id)
    {
        Topic::destroy($id);
        return $this->index();
    }


    private function getLinkFromName(string $input)
    {
        $transliterator = Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: Lower(); :: NFC;', Transliterator::FORWARD);
        $normalized = $transliterator->transliterate($input);

        return str_replace(" ", "-", $normalized);
    }
}
