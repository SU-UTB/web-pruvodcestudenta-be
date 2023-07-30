<?php

namespace App\Http\Controllers;

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
    function index()
    {
        return response([
            'sections' => SectionController::index(),
        ], 200);
    }
}
