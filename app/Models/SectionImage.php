<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SectionImage extends Model
{
    use HasFactory;

    protected $table = 'section_images';

    protected $fillable = ['path', 'name','section_id','optimized'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }
}
