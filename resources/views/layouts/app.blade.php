@php use Illuminate\Support\Facades\URL; @endphp
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'PruvodceStudenta | Admin') }}</title>

    <link rel="stylesheet" href="{{URL::secureAsset('css/bootstrap.min.css')}}">

    <link href="{{URL::secureAsset('css/bootstrap-colorpicker.css')}}" rel="stylesheet">

    <link href="{{ secure_asset('vendor/bladewind/css/animate.min.css') }}" rel="stylesheet"/>

    <link href="{{ secure_asset('vendor/bladewind/css/bladewind-ui.min.css') }}" rel="stylesheet"/>

    <script src="{{ secure_asset('vendor/bladewind/js/helpers.js') }}"></script>

</head>
<body class="font-sans antialiased" style="min-height: 100vh">

<script type="text/javascript" src="{{URL::secureAsset('js/jquery-3.2.1.slim.min.js')}}"></script>

<script type="text/javascript" src="{{URL::secureAsset('js/bootstrap.min.js')}}"></script>

<script type="text/javascript" src="{{URL::secureAsset('js/bootstrap-colorpicker.js')}}"></script>

<div class="bg-gray-100" style="min-height: 100vh">
    @include('components.navbar')

    <!-- Page Heading -->
    @if (isset($header))
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {{ $header }}
            </div>
        </header>
    @endif

    <!-- Page Content -->
    <main>
        {{ $slot }}
    </main>
</div>


</body>
</html>
