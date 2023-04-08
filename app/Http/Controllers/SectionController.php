<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public static function index(): Collection
    {
        return Section::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        return Section::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id): Response
    {
        return Section::find($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, int $id): Response
    {

        $section = Section::find($id);
        $section->update($request->all());
        return $section;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return int
     */
    public function destroy(int $id): int
    {
        return Section::destroy($id);
    }
}
