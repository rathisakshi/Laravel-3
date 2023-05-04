<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'brand_name',
        'model',
        'price_per_day',
        'fuel_type',
        'gearbox',
        'availability',
    ];

    public $timestamps=false;
}
