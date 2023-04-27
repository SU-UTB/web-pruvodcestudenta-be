<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentsController extends Controller
{
    public function index()
    {
        return  Topic::all();
    }

    public function update(Request $request, $id)
    {
        $content = Topic::find($id);
        $content->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return $this->index();
    }
}
