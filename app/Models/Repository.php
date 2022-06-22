<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    protected $fillable = [
        'name',
        'path',
        'personal_access_token',
        'team_id'
    ];

    public function block_types()
    {
        return $this->hasMany('App\Models\BlockTypes');
    }
}
