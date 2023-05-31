<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;


    protected $attributes = [
        'image' => '',
        'link' => '',
        'url' => '',
        'bg_color' => '',
    ];

    protected $fillable = [
        'title', 'description', 'image', 'section_id', 'location_id', 'link', 'bg_color'
    ];
}
