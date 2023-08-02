@props([
    'sections' =>[],
    'locations' =>[]
])

@php
    $sections = json_decode($sections,true) ;
    $locations = collect(json_decode($locations,true)) ;
@endphp

<x-bladewind.modal
    name="add-topic"
    title="Add topic"
    size="large"
    show_action_buttons="false">
    <form name="create-topic-form" id="create-topic-form" method="POST"
          action="{{route('admin.topics.create')}}">
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

        <x-bladewind.textarea
            rows={5}
            required
            name="description"
            placeholder="Description"

        />
        <br/>

        <x-bladewind.dropdown
            id="section_id"
            name="section_id"
            label_key="title"
            value_key="id"
            placeholder="Section"
            data="{{ json_encode( $sections) }}"
        />
        <br/>
        <x-bladewind.dropdown
            id="location_id"
            name="location_id"
            labelKey="name"
            valueKey="id"
            selectedValue="{{3}}"
            data="{{ json_encode( $locations) }}"

        />
        <br/>
        <x-bladewind.input
            name="url"
            placeholder="Url"

        />
        <br/>

        <x-bladewind.button size="tiny"
                            canSubmit="true">
            Add Topic
        </x-bladewind.button>
    </form>
</x-bladewind.modal>
