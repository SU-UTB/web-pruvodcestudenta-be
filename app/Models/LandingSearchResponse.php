<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Collection;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(schema="LandingSearchResponse")
 */
class LandingSearchResponse
{

    /**
     * @OA\Property(type="array",
     *@OA\Items(ref="#/components/schemas/SearchTopic"),
     * )
     *
     * @var Collection
     */
    public Collection $topics;


    public function __construct(Collection $topics)
    {
        $this->topics = $topics;
    }
}
