@php
    use Carbon\Carbon;
    $logs = $paginationLogs->items();


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
        console.log(activeLog.context);
        showModal('show-log');
        activeLog = null;
    }

</script>
<x-app-layout>
    <br>

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
        @foreach ($logs as $log)

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
