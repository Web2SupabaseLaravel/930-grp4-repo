<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>hi welcome to the site </h1>
    <div>
        @if (session()-> has('success'))
        <div>
            {{session('success')}}
        </div>
        @endif
    </div>
    <div>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Party Size</th>
                <th>Location</th>
                <th>Cuisine</th>
                
            </tr>
            @foreach ($reservations as $reservation )
            <tr>
                <td>{{ $reservation->id }}</td>
                    <td>{{ $reservation->date }}</td>
                    <td>{{ $reservation->time }}</td>
                    <td>{{ $reservation->duration }}</td>
                    <td>{{ $reservation->party_size }}</td>
                    <td>{{ $reservation->location }}</td>
                    <td>{{ $reservation->cuisine }}</td>
                    <td>
                    </form>
                </td>
            </tr>
            @endforeach
        </table>
         {{-- <a href="/CustomerMangemant/create"><button> create </button><a> --}}
    </div>
</body>
</html>