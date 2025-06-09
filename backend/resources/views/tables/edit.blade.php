<h2>Edit Table</h2>

<form method="POST" action="{{ route('tables.update', [$restaurant->id, $table->id]) }}">
    @csrf
    @method('PUT')
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
    <input type="number" name="size" value="{{ $table->size }}" required><br>

    <label>Availability:</label>
    <select name="status" required>
        <option value="1" {{ $table->availability ? 'selected' : '' }}>Available</option>
        <option value="0" {{ !$table->availability ? 'selected' : '' }}>Not Available</option>
    </select><br>

    <label>Location:</label>
    <input type="text" name="location" value="{{ $table->location }}" required><br>

    <button type="submit">Update</button>
</form>
