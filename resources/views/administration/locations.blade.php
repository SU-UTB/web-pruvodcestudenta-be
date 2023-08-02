@php
    $locations = $paginationLocations->items();
@endphp
<x-app-layout>
    <br>
    <div class="mx-auto d-flex justify-center items-center">
        <form style="width: 250px;" name="search-locations-form" id="search-locations-form" method="POST"
              action="{{route('search-locations')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search by name..."
                               value="{{$search}}"
                               onchange="this.form.submit();"/>
        </form>
        <div style="width: 100px"></div>
        <x-bladewind.button class="mb-3"
                            onclick="showModal('add-location')">
            Add Location
        </x-bladewind.button>
    </div>
    <br>
    <x-bladewind.table>
        <x-slot name="header">
            <th>Name</th>
            <th>Actions</th>
        </x-slot>
        @foreach ($locations as $location)
            <form action="/admin/locations/{{$location['id']}}" method="POST">
                @csrf
                @method('PUT')
                <tr>

                    <td>
                        <x-bladewind.input
                            name="name"
                            value="{{ $location['name'] }}"/>
                    </td>

                    <td>
                        <div class="d-flex flex-column">
                            <x-bladewind.button size="tiny"
                                                canSubmit="true"
                            >Save
                            </x-bladewind.button>
                            <br/>
                            <x-bladewind.button size="tiny" color="red">
                                <a href="{{ route('deleteLocation', $location['id']) }}">Delete</a></x-bladewind.button>
                        </div>
                    </td>
                </tr>

            </form>
        @endforeach
    </x-bladewind.table>

    <br/>
    <nav aria-label="Locations pagination" class="d-flex justify-content-center">
        <ul class="pagination">
            @for ($i = 1; $i <= $paginationLocations->lastPage(); $i++)
                @if($i === 1)
                    <li class="page-item  {{$paginationLocations->currentPage() === 1 ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationLocations->previousPageUrl()}}">Previous</a>
                    </li>
                @endif
                <li class="page-item {{$i ===$paginationLocations->currentPage() ? 'active' : ''}}">
                    <a class="page-link"
                       href="/admin/locations?page={{$i}}">{{$i}}</a></li>
                @if($i === $paginationLocations->lastPage())
                    <li class="page-item {{$paginationLocations->currentPage() === $paginationLocations->lastPage() ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationLocations->nextPageUrl()}}">Next</a></li>
                @endif
            @endfor
        </ul>
    </nav>

    <br/>

    <x-bladewind.modal
        name="add-location"
        title="Add location"
        size="large"
        show_action_buttons="false">
        <form name="create-location-form" id="create-location-form" method="POST"
              action="{{route('admin.locations.create')}}">
            @csrf
            @if($errors->any())
                <x-bladewind.alert>

                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </x-bladewind.alert>
            @endif
            <br/>

            <x-bladewind.input
                name="name"
                required
                placeholder="Name"

            />
            <br/>

            <x-bladewind.button size="tiny"
                                canSubmit="true">
                Add Location
            </x-bladewind.button>
        </form>
    </x-bladewind.modal>

</x-app-layout>
