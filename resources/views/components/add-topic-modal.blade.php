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
            onchange="getSlug(this)"
        />
        <script type="text/javascript">
            function getSlug(input1) {

                var input2 = document.getElementById('slug');
                var str = input1.value;
                str = str.replace(/^\s+|\s+$/g, ''); // trim
                str = str.toLowerCase();

                // remove accents, swap ñ for n, etc
                var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
                var to = "aaaaaeeeeeiiiiooooouuuunc------";
                for (var i = 0, l = from.length; i < l; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                    .replace(/\s+/g, '-') // collapse whitespace and replace by -
                    .replace(/-+/g, '-'); // collapse dashes

                input2.value = str;
            }
        </script>

        <textarea
            rows={5}
            name="description"
            placeholder="Description"
            id="editor"
        ></textarea>
        <script>
            ClassicEditor
                .create(document.querySelector('#editor'))
                .catch(error => {
                    console.error(error);
                });
        </script>
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

        <x-bladewind.input
            id="slug"
            name="slug"
            required
            placeholder="Slug"

        />
        <p style="color: red">
            Pečlivě zkontroluj slug!
            Slug je automaticky vygenerované slovo z názvu.
            <br/>
            Toto slovo bude použito pro identifikaci sekce v url
            adrese.
            <br/>
            Např. "www.pruvodcestudenta.utb.cz/sekce/nazevSekce/_slug_".
            <br/>
            Slug musí být unikátní, slug nelze později změnit.
        </p>
        <br/>
        <x-bladewind.button size="tiny"
                            canSubmit="true">
            Add Topic
        </x-bladewind.button>
    </form>
</x-bladewind.modal>
