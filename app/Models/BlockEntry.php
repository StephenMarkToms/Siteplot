<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockEntry extends Model
{
    protected $fillable = [
        'block_type_id',
        'order',
        'usage',
    ];

    protected $hidden = ['pivot'];

    public function widget_entries()
    {
        return $this->belongsToMany('App\Models\WidgetEntry', 'App\Models\BlockEntryWidgetEntry', 'block_entry_id', 'widget_entry_id');
    }

    public function block_type(): BelongsTo
    {
        return $this->BelongsTo('App\Models\BlockType', 'block_type_id');
    }
}
