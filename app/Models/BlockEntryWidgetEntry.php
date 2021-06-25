<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockEntryWidgetEntry extends Model
{
    use HasFactory;
    protected $table = "block_entry_widget_entry";

    public function widget_entry()
    {
        return $this->BelongsTo('App\Models\WidgetEntry','widget_entry_id');
    }


    public function block_entry()
    {
        return $this->BelongsTo('App\Models\BlockEntry','block_entry_id');
    }

}
