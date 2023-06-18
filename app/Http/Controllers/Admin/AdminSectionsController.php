<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Transliterator;
use function GuzzleHttp\Promise\all;

class AdminSectionsController extends Controller
{
    public static function index()
    {
        return view('administration/sections', ['sections' => Section::all(), "search" => ""]);
    }

    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        $section->update([
            'title' => $request->input('title') ?? '',
            'description' => $request->input('description') ?? '',
            'link' => $section->link,
            'bg_color' => $request->input('bg_color') ?? '',
            'image' => $section->image,
        ]);

        return $this->index();
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $section = Section::create(
            [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'link' => $request->input('link') ?? $this->getLinkFromName($request->input('title')),
                'bg_color' => $request->input('bg_color') ?? '#FF9F63',
                'image' => ''
            ]
        );

        return $this->index();
    }


    public function delete(Request $request, $id)
    {
        $section = Section::find($id);

        $topics = Topic::where('section_id', '=', $id)->get();

        if (count($topics) !== 0) {
            return response("Section has topics, please remove them first, then delete section!", 400);
        }

        Section::destroy($id);

        return $this->index();
    }

    public function sectionsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return AdminSectionsController::index();
        } else {

            $data = Section::whereRaw('LOWER(`title`) LIKE ? ', [trim(strtolower($search)) . '%'])->get();

            return view('administration/sections', ["sections" => $data, "search" => $search]);
        }
    }

    private static function array_any(array $array, callable $fn)
    {
        foreach ($array as $value) {
            if ($fn($value)) {
                return true;
            }
        }
        return false;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return int
     */
    public function destroy($id)
    {
        return Section::destroy($id);
    }

    private function getLinkFromName(string $input)
    {
        $transliterator = Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: Lower(); :: NFC;', Transliterator::FORWARD);
        $normalized = $transliterator->transliterate($input);

        return str_replace(" ", "-", $normalized);
    }
}
