<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Restaurant extends Model
{
    use HasUuids;
    protected $fillable = [
        'name', 'address', 'cuisine', 'phonenumber', 'opening_hours', 'capacity', 'manager_id', 'description'
    ]; 
    
    public function tables()
    {
        return $this->hasMany(Tables::class);
    }
}
