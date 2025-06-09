<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class customermangemant extends Model
{ 
    protected $table = 'customermangemant';
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'special_requests'
    ];
}
