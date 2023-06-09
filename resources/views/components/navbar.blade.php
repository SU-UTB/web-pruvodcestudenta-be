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

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/admin/">
        <img src="{{asset('images/utb.png')}}" width="30" height="30" class="d-inline-block align-top" alt="">
        Pruvodce studenta
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link {{$aDashboard}}" href="/admin/">Dashboard <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link {{$aSections}}" href="/admin/sections/">Sections</a>
            <a class="nav-item nav-link {{$aTopics}}" href="/admin/topics">Topics</a>
        </div>
    </div>
</nav>

