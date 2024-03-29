<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use OpenApi\Annotations as OA;

/**
 * Class Topic
 *
 * @OA\Schema(
 *   description="Topic schema",
 *   title="Topic",
 *   required={
 *     "title",
 *     "description",
 *     "color"
 *   },
 *    @OA\Property(
 *      property="title",
 *      type="string",
 *      format="string",
 *      description="Topic title"
 *    ) ,    @OA\Property(
 *      property="description",
 *      type="string",
 *      format="string",
 *      description="Topic description"
 *    ) ,    @OA\Property(
 *      property="link",
 *      type="string",
 *      format="string",
 *      description="section link used in URL"
 *    ) ,  @OA\Property(
 *      property="color",
 *      type="string",
 *      format="string",
 *      description="Section color in hex e.g.: #fff"
 *    ),  @OA\Property(
 *      property="url",
 *      type="string",
 *      format="string",
 *      description="Url of topic site"
 *    )
 * )
 */
class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'color', 'slug', 'url', 'section_id', 'location_id', 'location', 'visible'
    ];

    protected $attributes = [
        'title' => '',
        'description' => '',
        'color' => '',
        'slug' => '',
        'url' => '',
        'location' => '',
        'visible' => 1
    ];

    public function image(): HasOne
    {
        return $this->hasOne(TopicImage::class);
    }
}
