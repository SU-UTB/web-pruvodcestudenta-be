<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(schema="Location")
 */
class Location extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    protected $attributes = [
        'name' => '',
    ];
}
