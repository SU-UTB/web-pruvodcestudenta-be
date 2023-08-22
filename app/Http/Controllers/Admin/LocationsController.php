<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LocationsController extends Controller
{
    public static function index()
    {
        return view('administration/locations',
            ['paginationLocations' => Location::paginate(10), "search" => ""]);
    }

    public function locationsSearch(Request $request)
    {
        $search = $request->input('search');

        if ($search == '') {
            return LocationsController::index();
        } else {

            $data = Location::where('name', 'LIKE', '%' . trim(strtolower($search)) . '%')->paginate(10);

            return view('administration/locations', ["paginationLocations" => $data, "search" => $search]);
        }
    }

    public function update(Request $request, $id)
    {
        $location = Location::find($id);
        $location->update([
            'name' => $request->input('name') ?? ''
        ]);
        Log::notice('Location updated', [
            'context' => $location,
            'user' => $request->user()
        ]);
        return $this->index();
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $location = Location::create(
            [
                'name' => $request->input('name')
            ]
        );
        Log::notice('Location created', [
            'context' => $location,
            'user' => $request->user()
        ]);
        return $this->index();
    }


    public function delete(Request $request, $id)
    {
        $location = Location::find($id);

        $topics = Topic::where('location_id', '=', $id)->get();

        if (count($topics) !== 0) {
            return response("Location has topics, please remove them first, then delete section!", 400);
        }

        Location::destroy($id);

        Log::notice('Location deleted', [
            'context' => $location,
            'user' => $request->user()
        ]);

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
        return Location::destroy($id);
    }

}
