<h2>{{ $restaurant->name }}</h2>

<p><strong>Address:</strong> {{ $restaurant->address }}</p>
<p><strong>Cuisine:</strong> {{ $restaurant->cuisine }}</p>
<p><strong>Phone:</strong> {{ $restaurant->phone_number }}</p>
<p><strong>Open Hours:</strong> {{ $restaurant->open_hours }}</p>
<p><strong>Capacity:</strong> {{ $restaurant->capacity }}</p>

<h3>Tables</h3>
<ul>
    @foreach($restaurant->tables as $table)
        <li>Table {{ $table->table_number }} - Size: {{ $table->size }} - {{ $table->availability ? 'Available' : 'Occupied' }}</li>
    @endforeach
</ul>

<a href="{{ route('restaurants.index') }}">Back to list</a>
