<?php

namespace App\Http\Controllers;

use App\Models\SectionResponse;
use App\Models\Topic;
use App\Models\Section;
use App\Models\TopicResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use OpenApi\Annotations as OA;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public static function index(): Collection
    {
        return Section::query()->where('visible', '=', 1)->get()->map(function ($section) {
            $topics = collect();
            return new SectionResponse($topics, $section);
        });
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    /**
     * @OA\Get(
     *    path="/api/pages/sections/{slug}",
     *    tags={"Sections"},
     *    summary="Get section data",
     *    description="Get section data",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/SectionResponse"),
     *       ),
     *  )
     */
    public function show(string $slug): Response
    {
        $section = Section::firstWhere('slug', '=', $slug);

        $topics = Topic::query()->where('visible', '=', 1)->where('section_id', $section->id);

        return \response(json_encode(
            new SectionResponse(isset($topics) ? $topics->get()->map(function (Topic $t) {
                return
                    new TopicResponse($t);
            }) : collect(), $section)
            , JSON_UNESCAPED_UNICODE), 200);
    }


}
