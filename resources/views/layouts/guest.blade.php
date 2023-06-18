<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="{{URL::asset('css/bootstrap.min.css')}}">

    <link href="{{ asset('vendor/bladewind/css/animate.min.css') }}" rel="stylesheet"/>

    <link href="{{ asset('vendor/bladewind/css/bladewind-ui.min.css') }}" rel="stylesheet"/>

    <script src="{{ asset('vendor/bladewind/js/helpers.js') }}"></script>
</head>
<body class="font-sans antialiased" style="min-height: 100vh">

<script type="text/javascript" src="{{URL::asset('js/jquery-3.2.1.slim.min.js')}}"></script>

<script type="text/javascript" src="{{URL::asset('js/bootstrap.min.js')}}"></script>


<div class="bg-gray-100 flex flex-column justify-center items-center" style="min-height: 100vh">

    <x-application-logo class="w-20 h-20 fill-current text-gray-500"/>
    <br/>
    <br/>

    {{ $slot }}
</div>
</body>
</html>
