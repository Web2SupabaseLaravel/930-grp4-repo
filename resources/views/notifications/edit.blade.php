<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Notification</title>
</head>
<body>
    <h1>Edit Notification</h1>
    <form action="{{ route('notifications.update', $notification->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" value="{{ $notification->title }}" required><br>

        <label for="message">Message:</label>
        <textarea name="message" id="message" required>{{ $notification->message }}</textarea><br>

        <button type="submit">Update</button>
    </form>
</body>
</html>
