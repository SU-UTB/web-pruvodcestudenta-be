<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(schema="SearchTopic")
 */
class SearchTopic
{

    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $title;
    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $slug;
    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $sectionSlug;
    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $color;


    public function __construct(string $title, string $slug, string $sectionSlug, string $color)
    {
        $this->title = $title;
        $this->slug = $slug;
        $this->sectionSlug = $sectionSlug;
        $this->color = $color;
    }
}
