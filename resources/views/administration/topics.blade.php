<x-app-layout>
    <br>
    <div class="mx-auto d-flex justify-center items-center">
        <form style="width: 250px;" name="search-topics-form" id="search-topics-form" method="POST"
              action="{{route('search-topics')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search by name..."
                               value="{{$search}}"
                               onchange="this.form.submit();"/>
        </form>
        <div style="width: 100px"></div>
        <x-bladewind.button class="mb-3"
                            onclick="showModal('add-topic')">
            Add Topic
        </x-bladewind.button>
    </div>
    <br>
    <x-bladewind.table>
        <x-slot name="header">
            <th>Title</th>
            <th>Description</th>
            <th>Section</th>
            <th>Location</th>
            <th>Color</th>
            <th>Actions</th>
        </x-slot>
        @foreach ($topics as $topic)
            <form action="/admin/topics/{{$topic['id']}}" method="POST">
                @csrf
                @method('PUT')
                <tr>

                    <td>
                        <x-bladewind.input
                            name="title"
                            value="{{ $topic['title'] }}"/>
                    </td>
                    <td>
                        <x-bladewind.textarea
                            name="description"
                            placeholder="Description..."
                            selected_value="{{ $topic['description'] }}"
                        />
                    </td>
                    <td>
                        <x-bladewind.dropdown
                            id="section_{{$loop->index}}"
                            name="section_id_{{$loop->index}}"
                            label_key="title"
                            value_key="id"
                            selectedValue="{{$topic['section_id']}}"
                            data="{{ json_encode( $sections) }}"
                        />
                    </td>
                    <td>
                        <x-bladewind.dropdown
                            id="location_{{$loop->index}}"
                            name="location_id_{{$loop->index}}"
                            labelKey="name"
                            valueKey="id"
                            selectedValue="{{$topic['location_id']}}"
                            data="{{ json_encode($locations) }}"

                        />
                    </td>
                    <td>
                        <div id="cp{{ $loop->index }}" class="input-group colorpicker-component">

                            <label>
                                <x-bladewind.input
                                    name="bg_color"
                                    type="text" value="{{$topic['bg_color']}}" class="form-control"/>
                            </label>

                            <span class="input-group-addon"><i></i></span>


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
                                <a href="{{ route('deleteTopic', $topic['id']) }}">Delete</a></x-bladewind.button>
                        </div>
                    </td>
                </tr>
            </form>
        @endforeach
    </x-bladewind.table>

    <x-bladewind.modal
        name="add-section"
        title="Add topic"
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
