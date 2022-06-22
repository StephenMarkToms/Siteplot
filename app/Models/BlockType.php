<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockType extends Model
{
    protected $fillable = [
        'name',
        'file_name',
        'component',
        'team_id',
    ];

    public function widget_types()
    {
        return $this->belongsToMany('App\Models\WidgetType', 'block_type_widget_type', 'block_type_id', 'widget_type_id')->orderBy('order');
    }

    public function repositories()
    {
        return $this->belongsToMany('App\Models\Repository', 'block_type_repository', 'block_type_id', 'repository_id')->orderBy('id');
    }
}
