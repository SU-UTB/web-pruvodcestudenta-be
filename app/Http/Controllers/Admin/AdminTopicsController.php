<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Section;
use App\Models\Topic;
use App\Models\TopicImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Transliterator;

class AdminTopicsController extends Controller
{
    public static function index()
    {
        return Inertia::render('Admin/Topics',
            ['paginationTopics' => Topic::paginate(10),
                'sections' => Section::all(),
                'locations' => Location::all(), "search" => "",
                'topicImages' => TopicImage::all()]);
    }

    public function topicsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return AdminTopicsController::index();
        } else {

            $data = Topic::where('title', 'LIKE', '%' . trim(strtolower($search)) . '%')->orWhere('description', 'LIKE', '%' . trim(strtolower($search)) . '%')
                ->paginate(10);

            return Inertia::render('Admin/Topics', ["paginationTopics" => $data, "search" => $search,
                'sections' => Section::all(),
                'locations' => Location::all(),
                'topicImages' => TopicImage::all()]);
        }
    }

    public function update(Request $request, $id)
    {
        $topic = Topic::find($id);

        $sectionId = null;
        $locationId = null;

        foreach ($request->input() as $key => $value)
            if (preg_match('/^section_id/', $key))
                $sectionId = $value;
            else if (preg_match('/^location_id/', $key))
                $locationId = $value;


        $topic->update([
            'title' => $request->input('title') ?? '',
            'description' => $request->input('description') ?? '',
            'location' => $request->input('location') ?? '',
            'color' => $request->input('color') ?? isset($topic->color) ? $topic->color : '#FF9F63',
            'section_id' => $sectionId ?? 1,
            'location_id' => $locationId ?? 3,
            'url' => $request->input('url') ?? ''
        ]);

        $image = $request->image;
        if (isset($image) && !is_string($image)) {

            $topicImage = TopicImage::where('topic_id', $id)->get()->first();
            if (isset($topicImage)) {
                $normalizedFileName = $topic->slug . '.jpg';

                $path = $image->move(public_path('images/topics'), $normalizedFileName);

                $topicImage->update(
                    [
                        'name' => $normalizedFileName,
                        'path' => $path->getRealPath(),
                        'topic_id' => $topic->id,
                    ]
                );
            } else {
                $normalizedFileName = $topic->slug . '.jpg';

                $path = $image->move(public_path('images/topics'), $normalizedFileName);

                TopicImage::create(
                    [
                        'name' => $normalizedFileName,
                        'path' => $path->getRealPath(),
                        'topic_id' => $topic->id,
                    ]
                );
            }
        }


        Log::notice('Topic updated', [
            'context' => $topic,
            'user' => $request->user()
        ]);

        return redirect()->back();
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'section_id' => 'required',
            'location_id' => 'required',
            'slug' => 'required|unique:topics,slug'
        ]);

        $sectionId = $request->section_id;

        $section = Section::find($sectionId);

        $topic = Topic::create(
            [
                'title' => $request->input('title') ?? '',
                'description' => $request->input('description') ?? '',
                'url' => $request->input('url') ?? '',
                'color' => $section->color ?? '#FF9F63',
                'image' => '',
                'section_id' => $sectionId,
                'slug' => $request->input('slug') ?? $this->getSlugFromTitle($request->input('title')),
                'location_id' => $request->input('location_id'),
                'location' => $request->input('location')
            ]
        );

        if (isset($request->image)) {
            $normalizedFileName = $topic->slug . '.jpg';

            $path = $request->image->move(public_path('images/topics'), $normalizedFileName);

            $photo = TopicImage::create(
                [
                    'name' => $normalizedFileName,
                    'path' => $path->getRealPath(),
                    'topic_id' => $topic->id,
                ]
            );
        }

        Log::notice('Topic created', [
            'context' => $topic,
            'user' => $request->user()
        ]);

        return redirect()->back();
    }


    public function delete(Request $request, $id)
    {
        $topic = Topic::find($id);

        $topicImage = TopicImage::where('topic_id', $id)->get()->first();

        if (isset($topicImage)) {
            //TODO delete also file
            $topicImage->delete();
        }

        $topic->delete();

        Log::notice('Topic deleted', [
            'context' => $topic,
            'user' => $request->user()
        ]);
        return redirect()->back();
    }


    private function getSlugFromTitle(string $input)
    {
        $transliterator = Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: Lower(); :: NFC;', Transliterator::FORWARD);
        $normalized = $transliterator->transliterate($input);

        return str_replace(" ", "-", $normalized);
    }
}
