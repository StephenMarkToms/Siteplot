<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockEntryLayoutEntry extends Model
{
    use HasFactory;
    protected $table = "block_entry_layout_entry";

    public function layout_entry()
    {
        return $this->BelongsTo('App\Models\LayoutEntry','layout_entry_id');
    }


    public function block_entry()
    {
        return $this->BelongsTo('App\Models\BlockEntry','block_entry_id');
    }
}
