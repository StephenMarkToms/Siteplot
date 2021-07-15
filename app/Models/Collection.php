<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = [
        'name',
        'website_id',
    ];

    public function website()
    {
        return $this->BelongsTo('App\Models\Website', 'website_id');
    }
}
