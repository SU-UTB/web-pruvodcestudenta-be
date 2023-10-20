<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(schema="TopicResponse")
 */
class TopicResponse
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
    public string $url;

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
    public string $image;

    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $color;

    /**
     * @OA\Property(type="string")
     *
     * @var string
     */
    public string $location;


    public function __construct(Topic $topic)
    {
        $image = $topic->image()->get()->first();

        $this->title = $topic->title;
        $this->description = $topic->description;
        $this->slug = $topic->slug;
        $this->color = $topic->color;
        $this->url = $topic->url;
        $this->location = $topic->location;
        $this->image = isset($image) ? $image->path : '';
    }
}
