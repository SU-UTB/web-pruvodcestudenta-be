<x-app-layout>
    <br>
    <div class="mx-auto d-flex justify-center items-center">
        <form style="width: 250px;" name="search-reservation-form" id="search-reservation-form" method="POST"
              action="{{route('search-sections')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search by name..."
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
                        </div>{{--{{ $section['color'] }}--}}</td>


                    <script type="text/javascript">
                        $('#cp{{ $loop->index }}').colorpicker();
                    </script>
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

    <x-bladewind.modal
        name="add-section"
        title="Add section"
        class="min-w-[200px]">
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
            defaultValue={sectionData.title}
            placeholder="Title"

        />
        <br/>

        <x-bladewind.textarea
            rows={5}
            required
            name="description"
            defaultValue={sectionData.description}
            placeholder="Description"

        />
        <br/>

        <x-bladewind.input
            name="link"
            required
            defaultValue={sectionData.link}
            placeholder="Link (e.g. pruvodce.cz/_link_/clanek1)"

        />
        <br/>
        <x-color-picker name="bg_color"/>
        {{--        <x-bladewind.input
                    name="bg_color"
                    defaultValue={sectionData.bgColor}
                    placeholder="Background color (e.g. #FFF111)"

                />--}}
    </x-bladewind.modal>

</x-app-layout>
