<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    protected $fillable = [
        'name',    
        'domain',    
        'team_id', 
        'netlify_build_hook', 
    ];

    public function page_entries()
    {
        return $this->hasMany('App\Models\PageEntry');
    }
}
