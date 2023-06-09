<x-app-layout>

    <br>
    <div class="mx-auto" style="width: 250px;">
        <form name="search-reservation-form" id="search-reservation-form" method="POST"
              action="{{route('search-sections')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search by name..."
                               value="{{$search}}"
                               onchange="this.form.submit();"/>
        </form>
        <x-bladewind.button
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
            <tr>
                <td>
                    <x-bladewind.input value="{{ $section['title'] }}"/>
                </td>
                <td>
                    <x-bladewind.textarea
                        placeholder="Description..."> {{ $section['description'] }}</x-bladewind.textarea>
                </td>
                <td>{{ $section['link'] }}</td>
                <td>
                    <div id="cp{{ $loop->index }}" class="input-group colorpicker-component">

                        <label>
                            <input type="text" value="#00AABB" class="form-control"/>
                        </label>

                        <span class="input-group-addon"><i></i></span>
                    </div>{{--{{ $section['color'] }}--}}</td>


                <script type="text/javascript">
                    $('#cp{{ $loop->index }}').colorpicker();
                </script>
                <td>
                    <div class="flex flex-col">
                        <x-bladewind.button type="submit" class="btn btn-orange">Save</x-bladewind.button>

                        <x-bladewind.button type="submit" class="btn btn-orange">
                            <a href="{{ route('deleteSection', $section['id']) }}">Delete</a></x-bladewind.button>
                    </div>
                </td>
            </tr>

        @endforeach
    </x-bladewind.table>

    <x-bladewind.modal
        name="add-section"
        title="Add section"
        class="min-w-[200px]">
        <x-bladewind.notification>
            <div
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                {/*
                {{--
                            <HiX class="h-5 w-5" />
                --}}
                */}
            </div>
            <div class="ml-3 text-sm font-normal">
                {modalError}
            </div>
        </x-bladewind.notification>
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
