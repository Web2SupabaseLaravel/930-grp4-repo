<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notifications</title>
</head>
<body>
    <h1>Notifications</h1>
    <a href="{{ route('notifications.create') }}">Create Notification</a>
    <ul>
        @foreach ($notifications as $notification)
            <li>
                <strong>{{ $notification->title }}</strong><br>
                {{ $notification->message }}<br>
                <a href="{{ route('notifications.show', $notification->id) }}">View</a> | 
                <a href="{{ route('notifications.edit', $notification->id) }}">Edit</a> | 
                <form action="{{ route('notifications.destroy', $notification->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            </li>
        @endforeach
    </ul>
</body>
</html>
