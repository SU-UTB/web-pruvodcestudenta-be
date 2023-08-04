@php
    use Carbon\Carbon;
    $sections = $paginationSections->items();
@endphp
<x-app-layout>
    <br>
    <div class="mx-auto d-flex justify-center items-center">
        <form style="width: 250px;" name="search-reservation-form" id="search-reservation-form" method="POST"
              action="{{route('search-sections')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search..."
                               value="{{$search}}"
                               onchange="this.form.submit();"/>
        </form>
        <div style="width: 100px"></div>
        <x-bladewind.button class="mb-3"
                            onclick="showModal('add-section')">
            Add Section
        </x-bladewind.button>
    </div>
    <br>
    <x-bladewind.table>
        <x-slot name="header">
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Color</th>
            <th>Updated At</th>
            <th>Actions</th>
        </x-slot>
        @foreach ($sections as $section)
            <form action="/admin/sections/{{$section['id']}}" method="POST">
                @csrf
                @method('PUT')
                <tr>

                    <td>
                        <x-bladewind.input
                            name="title"
                            value="{{ $section['title'] }}"/>
                    </td>
                    <td>
                        <x-bladewind.textarea
                            name="description"
                            placeholder="Description..."
                            selected_value="{{ $section['description'] }}"
                        />
                    </td>
                    <td>{{ $section['link'] }}</td>
                    <td>
                        <div id="cp{{ $loop->index }}" class="input-group colorpicker-component">

                            <label>
                                <x-bladewind.input
                                    name="bg_color"
                                    type="text" value="{{$section['bg_color']}}" class="form-control"/>
                            </label>

                            <span class="input-group-addon"><i></i></span>
                        </div>
                    </td>


                    <script type="text/javascript">
                        $('#cp{{ $loop->index }}').colorpicker();
                    </script>
                    <td>
                        {{Carbon::create($section['updated_at'] )->format('d.m.')}}
                        <br/>
                        {{Carbon::create($section['updated_at'] )->format('H:i:s')}}
                    </td>
                    <td>
                        <div class="d-flex flex-column">
                            <x-bladewind.button size="tiny"
                                                canSubmit="true"
                            >Save
                            </x-bladewind.button>
                            <br/>
                            <x-bladewind.button size="tiny" color="red">
                                <a href="{{ route('deleteSection', $section['id']) }}">Delete</a></x-bladewind.button>
                        </div>
                    </td>
                </tr>

            </form>
        @endforeach
    </x-bladewind.table>

    <br/>
    <nav aria-label="Sections pagination" class="d-flex justify-content-center">
        <ul class="pagination">
            @for ($i = 1; $i <= $paginationSections->lastPage(); $i++)
                @if($i === 1)
                    <li class="page-item  {{$paginationSections->currentPage() === 1 ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationSections->previousPageUrl()}}">Previous</a>
                    </li>
                @endif
                <li class="page-item {{$i ===$paginationSections->currentPage() ? 'active' : ''}}">
                    <a class="page-link"
                       href="/admin/sections?page={{$i}}">{{$i}}</a></li>
                @if($i === $paginationSections->lastPage())
                    <li class="page-item {{$paginationSections->currentPage() === $paginationSections->lastPage() ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationSections->nextPageUrl()}}">Next</a></li>
                @endif
            @endfor
        </ul>
    </nav>

    <br/>

    <x-bladewind.modal
        name="add-section"
        title="Add section"
        size="large"
        show_action_buttons="false">
        <form name="create-section-form" id="create-section-form" method="POST"
              action="{{route('admin.sections.create')}}">
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
                name="title"
                required
                placeholder="Title"

            />
            <br/>

            <textarea
                rows={5}
                name="description"
                placeholder="Description"
                id="editor"
            ></textarea>

            <script src="https://cdn.ckeditor.com/ckeditor5/39.0.0/classic/ckeditor.js"></script>
            <script>
                ClassicEditor
                    .create(document.querySelector('#editor'))
                    .catch(error => {
                        console.error(error);
                    });
            </script>
            <br/>

            <div id="cp-modal" class="input-group colorpicker-component">

                <x-bladewind.input
                    name="color"
                    type="text" class="form-control"
                    placeholder="Color (#FFFFFF)"
                />

                <span class="input-group-addon"><i></i></span>

                <script type="text/javascript">
                    $('#cp-modal').colorpicker();
                </script>
            </div>
            <br/>
            <x-bladewind.button size="tiny"
                                canSubmit="true">
                Add Section
            </x-bladewind.button>
        </form>
    </x-bladewind.modal>

</x-app-layout>
