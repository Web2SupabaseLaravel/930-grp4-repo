<h2>Create Restaurant</h2>

@if ($errors->any())
    <div style="color: red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form method="POST" action="{{ route('restaurants.store') }}">
    @csrf
    <label>Name:</label>
    <input type="text" name="name" required><br>

    <label>Address:</label>
    <input type="text" name="address" required><br>

    <label>Cuisine:</label>
    <input type="text" name="cuisine" required><br>

    <label>Phone Number:</label>
    <input type="text" name="phonenumber" required><br>

    <label>Open Hours:</label>
    <input type="text" name="opening_hours"><br>

    <label>Capacity:</label>
    <input type="number" name="capacity"><br>
    
    <label>Description:</label>
    <input type="text" name="description"><br>

    <label>Manager_id:</label>
    <input type="text" name="manager_id" >


    <button type="submit">Create</button>
</form>
