<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
       protected $table = 'reservations';
  protected $fillable = [
        'reserved_by_user_id',
        'managed_by_user_id',
        'restaurant_id',
        'date',
        'duration',
        'special_req',
        'party_size',
        'status',
        'location',
        'cuisine',
        'time', 
    ];
}