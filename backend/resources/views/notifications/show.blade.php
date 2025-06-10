<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Notification</title>
</head>
<body>
    <h1>{{ $notification->title }}</h1>
    <p>{{ $notification->message }}</p>
    <a href="{{ route('notifications.index') }}">Back to Notifications</a>
</body>
</html>
