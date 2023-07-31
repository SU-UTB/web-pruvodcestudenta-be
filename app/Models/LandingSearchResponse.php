<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(schema="LandingSearchResponse")
 */
class LandingSearchResponse extends Model
{
    use HasFactory;

    /**
     * @OA\Property(type="array",
     *@OA\Items(ref="#/components/schemas/Section"),
     * )
     *
     * @var Collection
     */
    public Collection $sections;
    /**
     * @OA\Property(type="array",
     *@OA\Items(ref="#/components/schemas/Topic"),
     * )
     *
     * @var Collection
     */
    public Collection $topics;
}
