<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $student = parent::toArray($request);
        /* hna darna hadi bach njibo la différence bin date now w date updated => tay3tina date 
        3la had chkal => "3 months ago" */
        $student["updated_at"] = $this->resource->updated_at->diffForHumans();
        return $student;
    }
}
