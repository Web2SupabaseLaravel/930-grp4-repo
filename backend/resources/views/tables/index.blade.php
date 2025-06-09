<h2>Tables for Restaurant</h2>
<a href="{{ route('tables.create', $restaurant) }}">Create New Table</a>

@if(session('success'))
    <p style="color: green">{{ session('success') }}</p>
@endif

<table border="1" cellpadding="5">
    <tr>
        <th>Size</th>
        <th>Availability</th>
        <th>Location</th>
        <th>Actions</th>
    </tr>
    @foreach($tables as $table)
    <tr>
        <td>{{ $table->size }}</td>
        <td>{{ $table->status ? 'Available' : 'Not Available' }}</td>
        <td>{{ $table->location }}</td>
        <td>
            <a href="{{ route('tables.edit', [$restaurant->id, $table->id]) }}">Edit</a>
            <form method="POST" action="{{ route('tables.destroy', [$restaurant->id, $table->id]) }}" style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>
