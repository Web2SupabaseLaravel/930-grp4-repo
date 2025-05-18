<h2>Restaurant List</h2>

<a href="{{ route('restaurants.create') }}">Create New Restaurant</a>

@if(session('success'))
    <p style="color: green">{{ session('success') }}</p>
@endif

<table border="1" cellpadding="5">
    <tr>
        <th>Name</th>
        <th>Cuisine</th>
        <th>Phone</th>
        <th>Capacity</th>
        <th>Actions</th>
    </tr>
    @foreach($restaurants as $restaurant)
    <tr>
        <td>{{ $restaurant->name }}</td>
        <td>{{ $restaurant->cuisine }}</td>
        <td>{{ $restaurant->phonenumber }}</td>
        <td>{{ $restaurant->capacity }}</td>
        <!-- <td><a href="{{ route('tables.index','$restaurant->id')}}">Tables</a></td> -->
        <td>
            <a href="{{ route('restaurants.edit', $restaurant->id) }}">Edit</a>
            <form method="POST" action="{{ route('restaurants.destroy', $restaurant->id) }}" style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('Delete this restaurant?')">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>
