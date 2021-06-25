<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'website_id',
        'layout_id',
        'collection_id',
    ];

    public function block_entries()
    {
        return $this->belongsToMany('App\Models\BlockEntry', 'App\Models\BlockEntryPageEntry', 'page_entry_id', 'block_entry_id')->orderBy('order');
    }

    public function scopeDetails($query)
    {
        return $query->with(['website', 'collection', 'block_entries.widget_entries.widget_type', 'block_entries.block_type']);
    }

    public function scopeDetail($query)
    {
        return $query->load(['website', 'collection', 'block_entries.widget_entries.widget_type', 'block_entries.block_type']);
    }

    public function website()
    {
        return $this->BelongsTo('App\Models\Website','website_id');
    }

    public function layout()
    {
        return $this->BelongsTo('App\Models\LayoutEntry','layout_id');
    }

    public function collection()
    {
        return $this->BelongsTo('App\Models\Collection','collection_id');
    }
}
