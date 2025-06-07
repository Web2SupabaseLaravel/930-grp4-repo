<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Tables extends Model
{
    use HasUuids;
    protected $fillable = [
     'size', 'status', 'restaurant_id', 'location'
    ];


    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
