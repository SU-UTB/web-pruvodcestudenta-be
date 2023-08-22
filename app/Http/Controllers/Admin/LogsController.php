<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Topic;
use Yoeriboven\LaravelLogDb\Models\LogMessage;

class LogsController extends Controller
{
    function index()
    {
        return view('administration/logs', [
            'paginationLogs' => LogMessage::paginate(50),
        ]);
    }
}
