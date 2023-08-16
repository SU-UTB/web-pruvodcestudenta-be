<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OpenApi\Annotations as OA;

class TopicController extends Controller
{


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    /**
     * @OA\Get(
     *    path="/api/pages/topics/{slug}",
     *    tags={"Topics"},
     *    summary="Get topic data",
     *    description="Get topic data",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Topic"),
     *       ),
     *  )
     */
    public function show(string $slug)
    {
        return Topic::firstWhere('slug', '=', $slug);
    }


}
