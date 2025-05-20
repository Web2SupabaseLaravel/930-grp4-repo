<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'user_id', 'restaurant_id', 'table_id', 'date', 'duration', 'party_size', 'status', 'special_requests'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function table()
    {
        return $this->belongsTo(Table::class, 'table_id');
    }
}