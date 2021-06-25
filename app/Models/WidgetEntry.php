<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WidgetEntry extends Model
{
    protected $fillable = [
        'widget_type_id',
        'value'
    ];

    protected $hidden = ['pivot'];

    protected $casts = [
        'value' => 'array',
    ];

    public function widget_type()
    {
        return $this->BelongsTo('App\Models\WidgetType','widget_type_id');
    }
}
