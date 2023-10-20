<?php

namespace App\Http\Controllers;


use App\Models\LandingSearchResponse;
use App\Models\SearchTopic;
use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="PruvodceStudenta UTB - Api Documentation",
 *     description="Api Documentation for UTB's PruvodceStudenta",
 *     @OA\Contact(
 *         name="Sedlar David",
 *         email="sedlar@sutb.cz"
 *     ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * ),
 * @OA\Server(
 *     url="/api/v1",
 * ),
 */
class LandingController extends Controller
{
    /**
     * @OA\Get(
     *    path="/api/pages/landing",
     *    tags={"Pages"},
     *    summary="Get content of landing page",
     *    description="Get content of landing page",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Section")
     *         ),
     *       ),
     *  )
     */
    function index()
    {
        return response([
            'sections' => SectionController::index(),
        ], 200);
    }

    /**
     * @OA\Post(
     *   path="/api/pages/landing/search",
     *    tags={"Pages"},
     *   summary="Search",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="query",
     *                     type="string"
     *                 ),
     *                   @OA\Property(
     *                          property="locations",
     *                        type="array",
     *                        @OA\Items(
     *                            type="integer"
     *                        ),
     *                   ),
     *                        @OA\Property(
     *                          property="sections",
     *                        type="array",
     *                        @OA\Items(
     *                            type="integer"
     *                        ),
     *                   ),
     *                 example={ "query": "hospoda", "locations": { 1}, "sections" : {2,4}}
     *             )
     *         )
     *     ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *      @OA\MediaType(
     *          mediaType="application/json",
     *          @OA\Schema(ref="#/components/schemas/LandingSearchResponse")
     *          )
     *       ),
     *   @OA\Response(response=400, description="Bad request")
     * )
     */
    public function search(Request $request): Response
    {
        $request->validate([
            'query' => 'required'
        ]);

        $topicsQuery = Topic::query()->where('visible','=',1);
        $sectionsQuery = Section::query()->where('visible','=',1);

        if (isset($request->sections) && $request->sections) {
            $topicsQuery = $topicsQuery->whereIn('section_id', $request->sections);
            $sectionsQuery = $sectionsQuery->whereIn('id', $request->sections);
        }
        if (isset($request->locations) && $request->locations) {
            $topicsQuery = $topicsQuery->whereIn('location_id', $request->locations);
        }
        $sections = $sectionsQuery->get();
        $topics = $topicsQuery
            ->where('title', 'LIKE', '%' . $request->input('query') . '%')
            ->orWhere('description', 'LIKE', '%' . $request->input('query') . '%')
            ->get();

        $searchTopics = $topics->map(function ($topic) use ($sections) {
            return new SearchTopic($topic->title,
                $topic->slug ?? '',
                $sections->firstWhere('id', '==', $topic->section_id)->slug ?? '',
                $topic->color ?? ''
            );
        });
        return response(
            json_encode(
                new LandingSearchResponse($searchTopics)
                , JSON_UNESCAPED_UNICODE)
        );
    }
}
