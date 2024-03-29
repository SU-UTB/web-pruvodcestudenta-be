<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use OpenApi\Annotations as OA;

/**
 * Class Section
 *
 * @OA\Schema(
 *   description="Section schema",
 *   title="Section",
 *   required={
 *     "title",
 *     "description",
 *     "color"
 *   },
 *    @OA\Property(
 *      property="title",
 *      type="string",
 *      format="string",
 *      description="Section title"
 *    ) ,    @OA\Property(
 *      property="description",
 *      type="string",
 *      format="string",
 *      description="Section description"
 *    ) ,    @OA\Property(
 *      property="link",
 *      type="string",
 *      format="string",
 *      description="section link used in URL"
 *    ) ,    @OA\Property(
 *      property="icon",
 *      type="string",
 *      format="string",
 *      description="Icon of section"
 *    ) ,  @OA\Property(
 *      property="color",
 *      type="string",
 *      format="string",
 *      description="Section color in hex e.g.: #fff"
 *    )
 * )
 */
class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'slug', 'color', 'visible', 'icon'
    ];

    protected $attributes = [
        'title' => '',
        'description' => '',
        'slug' => '',
        'color' => '',
        'visible' => 1,
        'icon' => ''
    ];

    public function image(): HasOne
    {
        return $this->hasOne(SectionImage::class);
    }
}
