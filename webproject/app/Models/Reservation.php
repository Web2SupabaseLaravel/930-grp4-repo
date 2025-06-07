<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Reservation extends Model
{
    protected $table = 'reservations';

    protected $keyType = 'string';
    public $incrementing = false;

  protected $fillable = [
    'id',
    'date',
    'duration',
    'party_size',
    'location',
    'cuisine',
    'time',
    'restaurant_id',
];


  
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
