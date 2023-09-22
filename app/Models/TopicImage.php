<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TopicImage extends Model
{
    use HasFactory;

    protected $table = 'topic_images';

    protected $fillable =['path'];


    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
