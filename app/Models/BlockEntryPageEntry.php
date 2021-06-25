<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockEntryPageEntry extends Model
{
    use HasFactory;
    protected $table = "block_entry_page_entry";

    public function page_entry()
    {
        return $this->BelongsTo('App\Models\PageEntry','page_entry_id');
    }


    public function block_entry()
    {
        return $this->BelongsTo('App\Models\BlockEntry','block_entry_id');
    }
}
