<x-guest-layout>

    <div class="card" style="min-width: 500px">
        <div class="card-header text-center font-weight-bold">
            Login
        </div>
        <div class="card-body">

            <form name="add-blog-post-form" id="add-blog-post-form" method="POST" action="{{ route('login') }}">
                @csrf

                <div class="form-group mt-2">
                    <x-bladewind.input type="email" class="form-control" id="email" name="email"
                                       placeholder="kaja@bourak.com"/>
                </div>
                <div class="form-group mt-2">
                    <x-bladewind.input type="password" class="form-control" id="password" name="password"
                                       placeholder="*****"/>
                </div>

                <div class="form-group">
                    <x-bladewind.button size="tiny"
                                        canSubmit="true">Log in
                    </x-bladewind.button>
                </div>
            </form>
        </div>
    </div>
</x-guest-layout>
