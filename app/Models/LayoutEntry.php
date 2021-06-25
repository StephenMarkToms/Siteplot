<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayoutEntry extends Model
{
    protected $fillable = [
        'name',
        'page_entry_id',
        'website_id',
    ];
    
    public function block_entries()
    {
        return $this->belongsToMany('App\Models\BlockEntry', 'App\Models\BlockEntryLayoutEntry', 'block_entry_id', 'layout_entry_id')->orderBy('order');
    }

    public function website()
    {
        return $this->BelongsTo('App\Models\Website','website_id');
    }

    public function scopeDetails($query)
    {
        return $query->with('website', 'block_entries.widget_entries.widget_type', 'block_entries.block_type');
    }
}
