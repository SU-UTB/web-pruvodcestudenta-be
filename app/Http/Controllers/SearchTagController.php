<?php

namespace App\Http\Controllers;

use App\Models\SearchTag;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class SearchTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public static function index()
    {
        return  SearchTag::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SearchTag  $searchTag
     * @return \Illuminate\Http\Response
     */
    public function show(SearchTag $searchTag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SearchTag  $searchTag
     * @return \Illuminate\Http\Response
     */
    public function edit(SearchTag $searchTag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SearchTag  $searchTag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SearchTag $searchTag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SearchTag  $searchTag
     * @return \Illuminate\Http\Response
     */
    public function destroy(SearchTag $searchTag)
    {
        //
    }
}
