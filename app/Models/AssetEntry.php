<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'website_id',
    ];

    public function website()
    {
        return $this->BelongsTo('App\Models\Website','website_id');
    }
}
