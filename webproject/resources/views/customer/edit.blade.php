<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>its me mario !</h1>
    <div>
        @if ($errors->any())
        <ul>
            @foreach ( $errors->all() as  $error)
            <li>{{ $error}}</li>
            @endforeach
        </ul>
        
        @endif
    </div>
    <form method="post" action="{{route('customer.update' , ['customer' => $customer])}}">
        @csrf
        @method('put')
        <div>
            <label >name</label>
            <input type="text" name="name" placeholder="name" value="{{$customer->name}}">
        </div>
         <div>
            <label >email</label>
            <input type="text" name="email" placeholder="email" value="{{$customer->email}}">
        </div>
          <div>
            <label >phone_number</label>
            <input type="text" name="phone_number" placeholder="phone_number" value="{{$customer->phone_number}}">
        </div>
        <div>
            <label >special_requests</label>
            <input type="text" name="special_requests" placeholder="special_requests" value="{{ $customer->special_requests }}">
        </div>
         <div>
            <input type="submit" value="save the data">
         </div>
    </form>
</body>
</html>