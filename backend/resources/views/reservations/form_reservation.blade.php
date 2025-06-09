@extends('layouts.app')

@section('content')
    <h2>{{ $titleForm }}</h2>

    @if(session('success'))
        <div style="color: green;">{{ session('success') }}</div>
    @endif
    @if(session('error'))
        <div style="color: red;">{{ session('error') }}</div>
    @endif

    <form action="{{ $reservation->exists ? route($route, $reservation->id) : route($route) }}" method="POST">
        @csrf
        @if($method === 'put')
            @method('PUT')
        @endif

        <div>
            <label for="location">Location (الموقع):</label>
            <input type="text" name="location" id="location" value="{{ old('location', $reservation->location) }}" required>
            @error('location') <span style="color:red">{{ $message }}</span> @enderror
        </div>

        <div>
            <label for="date">Date (التاريخ):</label>
            <input type="date" name="date" id="date" value="{{ old('date', $reservation->date) }}" required>
            @error('date') <span style="color:red">{{ $message }}</span> @enderror
        </div>

        <div>
            <label for="time">Time (الوقت):</label>
            <input type="time" name="time" id="time" value="{{ old('time', $reservation->time) }}" required>
            @error('time') <span style="color:red">{{ $message }}</span> @enderror
        </div>

        <div>
            <label for="duration">Duration (مدة الحجز):</label>
            <input type="text" name="duration" id="duration" value="{{ old('duration', $reservation->duration) }}" required>
            @error('duration') <span style="color:red">{{ $message }}</span> @enderror
        </div>

        <div>
            <label for="party_size">Party Size (عدد الأشخاص):</label>
            <input type="number" name="party_size" id="party_size" min="1" value="{{ old('party_size', $reservation->party_size) }}" required>
            @error('party_size') <span style="color:red">{{ $message }}</span> @enderror
        </div>

    

        <div>
            <label for="cuisine">Cuisine (نوع المطبخ):</label>
            <input type="text" name="cuisine" id="cuisine" value="{{ old('cuisine', $reservation->cuisine) }}" required>
            @error('cuisine') <span style="color:red">{{ $message }}</span> @enderror
        </div>

        <button type="submit">{{ $submitButton }}</button>
    </form>

    @if(isset($reservations) && $reservations->count())
        <h3>Existing Reservations</h3>
        <ul>
            @foreach($reservations as $r)
                <li>
                    {{ $r->date }} - {{ $r->location }} - {{ $r->party_size }} persons
                    <a href="{{ route('reservations.edit', $r->id) }}">Edit</a>
                    <form action="{{ route('reservations.destroy', $r->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('هل أنت متأكد؟')">Delete</button>
                    </form>
                </li>
            @endforeach
        </ul>
    @endif
@endsection
