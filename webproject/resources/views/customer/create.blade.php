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
    <form method="post" action="{{route('customer.store')}}">
        @csrf
        @method('post')
        <div>
            <label >name</label>
            <input type="text" name="name" placeholder="name">
        </div>
         <div>
            <label >email</label>
            <input type="text" name="email" placeholder="email">
        </div>
         <div>
            <input type="submit" value="save the data">
         </div>
    </form>
</body>
</html>