<?php

namespace App\Observers;

use App\Models\BlockType;
use Illuminate\Support\Facades\Http;

class BlockTypeObserver
{
    /**
     * Handle the BlockType "created" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function created(BlockType $blockType)
    {
        //
    }

    /**
     * Handle the BlockType "updated" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function updated(BlockType $blockType)
    {
        $url = 'https://api.github.com/repos/' . $blockType->repositories[0]->path . '/contents/components/' . $blockType->file_name;

        $data = [
            "message" => "Updating File",
            "committer" => [
                "name" => "Siteplot Bot",
                "email" => "s.mark.toms+siteplot@gmail.com"
            ],
            "content" => base64_encode($blockType->component)
        ];

        $response = Http::withHeaders([
            'Authorization' => $blockType->repositories[0]->personal_access_token,
        ])->withBody(
            json_encode($data),
            'application/json'
        )->put($url);
    }

    /**
     * Handle the BlockType "deleted" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function deleted(BlockType $blockType)
    {
        //
    }

    /**
     * Handle the BlockType "restored" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function restored(BlockType $blockType)
    {
        //
    }

    /**
     * Handle the BlockType "force deleted" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function forceDeleted(BlockType $blockType)
    {
        //
    }
}
