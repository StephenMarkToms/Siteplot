<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WidgetType extends Model
{
    protected $fillable = [
        'order',
        'data_type_id',
        'usage',
        'label',
        'name'
    ];

    public function data_type(){
        return $this->belongsTo('App\Models\DataType')->withDefault();
    }

}
