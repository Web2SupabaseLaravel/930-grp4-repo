<h2>Create Table</h2>

<form method="POST" action="{{ route('tables.store', $restaurant) }}">
    @csrf
    @if ($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <label>Size:</label>
    <input type="number" name="size" required><br>

    <label>Availability:</label>
    <select name="status" required>
        <option value="1">Available</option>
        <option value="0">Not Available</option>
    </select><br>

    <label>Location:</label>
    <input type="text" name="location"><br>

    <button type="submit">Create</button>
</form>
