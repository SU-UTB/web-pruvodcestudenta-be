<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(schema="Topic")
 */
class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'color', 'link', 'url'
    ];

    protected $attributes = [
        'title' => '',
        'description' => '',
        'image' => '',
        'color' => '',
        'link' => '',
        'url' => ''

    ];
}
