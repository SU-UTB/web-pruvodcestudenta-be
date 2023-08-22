@php
    use Carbon\Carbon;
    $logs = collect($paginationLogs->items());


    function tagColor($level) {
        if($level === 'ERROR') return 'red';
        if($level === 'WARNING') return 'orange';
         return 'blue';
    }
@endphp

<script>
    var activeLog = null;

    function showLog(log) {
        activeLog = log;
        document.getElementById("modal-message").innerText = activeLog.message;
        document.getElementById("modal-context").innerText = activeLog.context.exception;
        showModal('show-log');
        activeLog = null;
    }

    function showUserLog(log) {
        activeLog = log;
        console.log(activeLog.context.context);
        document.getElementById("modal-message").innerText = activeLog.message + ", User: " + activeLog.context.user.email;
        document.getElementById("modal-context").innerText = JSON.stringify(activeLog.context.context);
        showModal('show-log');
        activeLog = null;
    }

</script>
<x-app-layout>
    <br>

    <div>
        <x-bladewind.tab-group name="logs">

            <x-slot name="headings">
                <x-bladewind.tab-heading
                    name="user-logs" label="User logs" active="{{true}}"/>

                <x-bladewind.tab-heading
                    name="all-logs" label="All logs"/>


            </x-slot>

            <x-bladewind.tab-body>

                <x-bladewind.tab-content name="user-logs" active="{{true}}">

                    <x-bladewind.table>
                        <x-slot name="header">
                            <th>Id</th>
                            <th>Action</th>
                            <th>Logged at</th>
                            <th>User</th>
                            <th>Context</th>
                            <th>Actions</th>
                        </x-slot>
                        @foreach ($logs->where('level_name', '=', 'NOTICE') as $log)

                            <tr>

                                <td>
                                    <div>
                                        {{ $log['id'] }}
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        {{ $log['message'] }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ $log['logged_at'] }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ json_encode($log['context']->toArray()['user']['name']) }}
                                        <br/>
                                        {{ json_encode($log['context']->toArray()['user']['email']) }}
                                    </div>

                                </td>
                                <td>
                                    <div style="height:60px; overflow:hidden">
                                        {{ json_encode($log['context']->toArray()['context']) }}
                                    </div>
                                </td>
                                <td>
                                    <x-bladewind.button class="mb-3"
                                                        onclick="showUserLog({{ json_encode($log, JSON_HEX_TAG) }})">
                                        Show more
                                    </x-bladewind.button>

                                </td>

                            </tr>

                        @endforeach
                    </x-bladewind.table>


                </x-bladewind.tab-content>

                <x-bladewind.tab-content name="all-logs">
                    <x-bladewind.table>
                        <x-slot name="header">
                            <th>Id</th>
                            <th>Level name</th>
                            <th>Level</th>
                            <th>Message</th>
                            <th>Logged at</th>
                            <th>Context</th>
                            <th>Extra</th>
                            <th>Actions</th>
                        </x-slot>
                        @foreach ($logs->where('level_name', '!=', 'NOTICE') as $log)

                            <tr>

                                <td>
                                    <div>
                                        {{ $log['id'] }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <x-bladewind.tag label="{{ $log['level_name'] }}"
                                                         color="{{tagColor($log['level_name'])}}"/>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ $log['level'] }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ $log['message'] }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ $log['logged_at'] }}
                                    </div>
                                </td>
                                <td>
                                    <div style="height:40px; width: 250px; overflow:hidden">
                                        {{ json_encode($log['context']->toArray()) }}
                                    </div>
                                </td>
                                <td>
                                    <div style="height:40px; overflow:hidden">
                                        {{ json_encode($log['extra']->toArray()) }}
                                    </div>
                                </td>
                                <td>
                                    <x-bladewind.button class="mb-3"
                                                        onclick="showLog({{ json_encode($log, JSON_HEX_TAG) }})">
                                        Show more
                                    </x-bladewind.button>

                                </td>

                            </tr>

                        @endforeach
                    </x-bladewind.table>

                </x-bladewind.tab-content>


            </x-bladewind.tab-body>

        </x-bladewind.tab-group>
    </div>


    <br/>
    <nav aria-label="Logs pagination" class="d-flex justify-content-center">
        <ul class="pagination">
            @for ($i = 1; $i <= $paginationLogs->lastPage(); $i++)
                @if($i === 1)
                    <li class="page-item  {{$paginationLogs->currentPage() === 1 ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationLogs->previousPageUrl()}}">Previous</a>
                    </li>
                @endif
                <li class="page-item {{$i ===$paginationLogs->currentPage() ? 'active' : ''}}">
                    <a class="page-link"
                       href="/admin/logs?page={{$i}}">{{$i}}</a></li>
                @if($i === $paginationLogs->lastPage())
                    <li class="page-item {{$paginationLogs->currentPage() === $paginationLogs->lastPage() ? 'disabled' : ''}}">
                        <a class="page-link"
                           href="{{$paginationLogs->nextPageUrl()}}">Next</a></li>
                @endif
            @endfor
        </ul>
    </nav>


    <x-bladewind.modal
        id="myModal"
        name="show-log"
        title="Log"
        size="omg"
        show_action_buttons="false">
        <p id="modal-message" style="overflow-y: scroll;">
        </p>
        <br/>
        <p id="modal-context" style="max-height: 500px; overflow-y: scroll;">
        </p>
    </x-bladewind.modal>


</x-app-layout>
