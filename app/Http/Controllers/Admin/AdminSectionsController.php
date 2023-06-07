<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSectionsController extends Controller
{
    public function index()
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
            'bg_color' => $request->input('bg_color') ?? $section->bg_color,
            'image' => $section->image,
        ]);

        return $this->index();
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'link' => 'required',
            'bgColor' => 'required'
        ]);

        $section = Section::create(
            [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'link' => $request->input('link'),
                'bg_color' => $request->input('bgColor'),
                'image' => ''
            ]
        );

        return response()->json($section, 200);
    }


    public function save(Request $request, $id)
    {
        dd($id);
    }

    public function cancel(Request $request, $id)
    {
        dd($id);
   /*     $seats = Seat::where('rezervace', '=', $id)->get();

        foreach ($seats as $seat) {
            $seat->rezervace = null;
            $seat->save();
        }
        $availableStands = AvailableStands::find(1);
        $availableStands->update([
            'count' =>  $availableStands->count + Reservation::find($id)->stand,
        ]);
        $availableStands->save();
        $this->destroy($id);
        return AdminSectionsController::();*/
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
}
