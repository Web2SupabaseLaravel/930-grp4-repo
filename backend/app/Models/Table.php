<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'restaurant_id', 'size', 'status', 'location', 'table_number'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'table_id');
    }

    // Accessor لتحويل قيم status
    public function getStatusAttribute($value)
    {
        // لو القيمة كانت string أو رقم، حولها لـ boolean
        if (is_string($value)) {
            return $value === 'available' || $value === '1';
        }
        if (is_numeric($value)) {
            return (bool) $value;
        }
        return $value; // لو كانت boolean أصلاً، رجّعها زي ما هي
    }

    // Mutator للتأكد إن القيمة بتتحفظ كـ boolean
    public function setStatusAttribute($value)
    {
        if (is_string($value)) {
            $this->attributes['status'] = $value === 'available' || $value === '1';
        } elseif (is_numeric($value)) {
            $this->attributes['status'] = (bool) $value;
        } else {
            $this->attributes['status'] = $value;
        }
    }
}