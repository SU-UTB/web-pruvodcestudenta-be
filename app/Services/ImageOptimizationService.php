<?php

namespace App\Services;

use App\Models\SectionImage;
use App\Models\TopicImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Spatie\Image\Image;

class ImageOptimizationService
{

    public static function optimize()
    {
        $sectionImages = SectionImage::where('optimized', false)->get();

        Log::notice('Optimizing section images');

        foreach ($sectionImages as $image) {
            try {
                Image::load($image->path)
                    ->optimize()
                    ->save($image->path . '.webp');

                Image::load($image->path)
                    ->width(1920)
                    ->optimize()
                    ->save($image->path . '.fhd.webp');

                $image->update([
                    'optimized' => true,
                ]);
                $image->save();

            } catch (\Exception $e) {
                throw  $e;
            }
        }

        $topicImages = TopicImage::where('optimized', false)->get();

        Log::notice('Optimizing topic images');

        foreach ($topicImages as $image) {
            try {
                Image::load($image->path)
                    ->optimize()
                    ->save($image->path . '.webp');

                Image::load($image->path)
                    ->width(1920)
                    ->optimize()
                    ->save($image->path . '.fhd.webp');

                $image->update([
                    'optimized' => true,
                ]);
                $image->save();

            } catch (\Exception $e) {
                throw  $e;
            }
        }

        Log::notice('Optimization is done');
    }
}
