<h2>Edit Restaurant</h2>

<form method="POST" action="{{ route('restaurants.update', $restaurant->id) }}">
    @csrf
    @method('PUT')

    <label>Name:</label>
    <input type="text" name="name" value="{{ $restaurant->name }}" required><br>

    <label>Address:</label>
    <input type="text" name="address" value="{{ $restaurant->address }}" required><br>

    <label>Cuisine:</label>
    <input type="text" name="cuisine" value="{{ $restaurant->cuisine }}" required><br>

    <label>Phone Number:</label>
    <input type="text" name="phone_number" value="{{ $restaurant->phonenumber }}" required><br>

    <label>Open Hours:</label>
    <input type="text" name="open_hours" value="{{ $restaurant->opening_hours }}" required><br>

    <label>Capacity:</label>
    <input type="number" name="capacity" value="{{ $restaurant->capacity }}" required><br>

    <label>Description:</label>
    <input type="text" name="description" value="{{ $restaurant->description }}" required><br>

    <label>Manager ID:</label>
    <input type="text" name="manager_id" value="{{ $restaurant->manager_id }}" required><br>

    <button type="submit">Update</button>
</form>

