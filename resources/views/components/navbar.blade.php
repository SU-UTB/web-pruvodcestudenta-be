@php
    $aDashboard = '';
    $aSections = '';
    $aTopics = '';
    if (request()->routeIs('dashboard')) {
        $aDashboard = 'active';
    } elseif (request()->routeIs('sections')) {
        $aSections = 'active';
    } elseif (request()->routeIs('topics')) {
        $aTopics = 'active';
    }
@endphp

<ul class="nav nav-tabs">
    <li class="nav-item active">
        <a class="nav-link {{ $aDashboard }}" href="/admin/">Dashboard </a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{ $aSections }}" href="/admin/sections/">Sections</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{ $aTopics }}" href="/admin/topics/">Topics</a>
    </li>
    <li class="nav-item ml-auto">
        <form method="POST" action="{{ route('logout') }}" name="logout-form" id="logout-form">
            @csrf

            <div class="form-group">
                <button type="submit" class="btn btn-blue">Logout</button>
            </div>
        </form>
    </li>
</ul>

