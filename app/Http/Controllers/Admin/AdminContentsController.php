<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contents', [
            'contents' => Content::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $content = Content::find($id);
        $content->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return $this->index();
    }
}
