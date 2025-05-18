@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Admin Dashboard</h1>

    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">count restaurants</h5>
                    <p class="card-text">{{ count($restaurants) }}</p>
                    <a href="{{ route('admin.restaurants') }}" class="btn btn-primary">restaurants</a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">count users</h5>
                    <p class="card-text">{{ count($users) }}</p>
                    <a href="{{ route('admin.users') }}" class="btn btn-primary">users</a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">count reservations</h5>
                    <p class="card-text">{{ count($reservations) }}</p>
                    <a href="{{ route('admin.reservations') }}" class="btn btn-primary">reservations</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
