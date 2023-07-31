<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(schema="Tag")
 */
class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'topic_id'
    ];

}
