<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Pruvodce studenta | Admin') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Scripts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">


</head>

<body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
</script>
<div class="min-h-screen bg-gray-100">

    <x-navbar></x-navbar>
    <!-- Page Content -->
    <main>

        <br>
        <div class="mx-auto" style="width: 250px;">
            <form name="search-reservation-form" id="search-reservation-form" method="POST"
                  action="{{route('search-sections')}}">
                @csrf

                <input type="text" class="form-control" id="search" name="search" placeholder="Search by name..."
                       value="{{$search}}"
                       onchange="this.form.submit();">
            </form>
        </div>
        <br>
        <table class="table table-striped">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col">#</th>
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Title
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Description
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Link
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Color
                </th>
                <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Save</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Delete</span>
                </th>
            </tr>
            </thead>
            <tbody>
            @foreach ($sections as $section)
                <tr>
                    <th scope="row">

                    </th>
                    <td>
                        <label>
                            <input value="{{ $section['title'] }}"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            <textarea> {{ $section['description'] }}</textarea>
                        </label>
                    </td>
                    <td>{{ $section['link'] }}</td>
                    <td>{{ $section['color'] }}</td>
                    <td>
                        <button type="submit" class="btn btn-orange">{{--
                            <a href="{{ route('saveSection', $section['id']) }}">Save</a>--}}</button>
                    </td>
                    <td>
                        <button type="submit" class="btn btn-orange">
                            <a href="{{ route('deleteSection', $section['id']) }}">Delete</a></button>
                    </td>
                </tr>

            @endforeach


            </tbody>
        </table>

    </main>
</div>


</body>


</html>

<script>
    function onSearch(params) {
        console.log(params);
    }
</script>
