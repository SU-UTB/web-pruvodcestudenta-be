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
        return view('administration/sections',
            ['paginationSections' => Section::paginate(10), "search" => ""]);
    }

    public function sectionsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return AdminSectionsController::index();
        } else {

            $data = Section::where('title', 'LIKE', '%' . trim(strtolower($search)) . '%')->orWhere('description', 'LIKE', '%' . trim(strtolower($search)) . '%')
                ->paginate(10);

            return view('administration/sections', ["paginationSections" => $data, "search" => $search]);
        }
    }

    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        $section->update([
            'title' => $request->input('title') ?? '',
            'description' => $request->input('description') ?? '',
            'color' => $request->input('color') ?? '',
            'image' => $section->image,
        ]);

        return $this->index();
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'slug' => 'unique:sections,slug'
        ]);

        $section = Section::create(
            [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'slug' => $request->input('slug') ?? $this->getLinkFromName($request->input('title')),
                'color' => $request->input('color') ?? '#FF9F63',
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
