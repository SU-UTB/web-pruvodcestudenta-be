@php
    use Carbon\Carbon;
    $topics = $paginationTopics->items();
@endphp
<x-app-layout>
    <br>
    <div class="mx-auto d-flex justify-center items-center">
        <form style="width: 250px;" name="search-topics-form" id="search-topics-form" method="POST"
              action="{{route('search-topics')}}">
            @csrf

            <x-bladewind.input type="text" class="form-control" id="search" name="search"
                               placeholder="Search..."
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
            <th>Url</th>
            <th>Updated At</th>
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
                        <x-bladewind.input
                            name="url"
                            value="{{ $topic['url'] }}"/>
                    </td>
                    <td>
                        {{Carbon::create($topic['updated_at'] )->format('d.m.')}}
                        <br/>
                        {{Carbon::create($topic['updated_at'] )->format('H:i:s')}}
                    </td>
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

    <br/>
    <nav aria-label="Topics example" class="d-flex justify-content-center">
        <ul class="pagination">
            @for ($i = 1; $i <= $paginationTopics->lastPage(); $i++)
                @if($i === 1)
                    <li class="page-item {{$paginationTopics->currentPage() === 1 ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationTopics->previousPageUrl()}}">Previous</a>
                    </li>
                @endif

                <li class="page-item {{$i === $paginationTopics->currentPage() ? 'active' : ''}}">
                    <a class="page-link"
                       href="/admin/topics?page={{$i}}">{{$i}}</a></li>
                @if($i === $paginationTopics->lastPage())
                    <li class="page-item {{$paginationTopics->currentPage() === $paginationTopics->lastPage() ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationTopics->nextPageUrl()}}">Next</a></li>
                @endif
            @endfor
        </ul>
    </nav>

    <br/>

    <x-add-topic-modal
        sections="{!! json_encode(collect($sections)) !!}"
        locations="{!! json_encode(collect($locations)) !!}"
    />

</x-app-layout>
