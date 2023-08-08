<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(schema="SectionResponse")
 */
class SectionResponse
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
    public string $description;

    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $link;

    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $color;

    /**
     * @OA\Property(type="array",
     *@OA\Items(ref="#/components/schemas/Topic"),
     * )
     *
     * @var Collection
     */
    public Collection $topics;


    public function __construct(Collection $topics, Section $section)
    {
        $this->topics = $topics;
        $this->title = $section->title;
        $this->description = $section->description;
        $this->slug = $section->slug;
        $this->color = $section->color;
    }
}
