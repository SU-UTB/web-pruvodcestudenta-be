<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Topic;
use Inertia\Inertia;
use Yoeriboven\LaravelLogDb\Models\LogMessage;

class LogsController extends Controller
{
    function index()
    {
        return Inertia::render('Admin/Logs', [
            'paginationLogs' => LogMessage::paginate(50),
        ]);
    }
}
