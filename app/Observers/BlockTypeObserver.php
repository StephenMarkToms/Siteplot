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

    public function CreateFile(array $data, String $url, String $token)
    {
        $response = Http::withHeaders([
                    "Authorization" => $token,
                ])->withBody(
                    json_encode($data),
                    'application/json'
                )->put($url);
        return $response;
    }

    /**
     * Handle the BlockType "updated" event.
     *
     * @param  \App\Models\BlockType  $blockType
     * @return void
     */
    public function updated(BlockType $blockType)
    {
        dd($blockType->getChanges(), $blockType->getOriginal());

        // Check changes and see if filename has changed
        // If file name has changed delete the old file
        // Proceed to create the new file

        $data = [
            "message" => "Updating File",
            "committer" => [
                "name" => "Siteplot Bot",
                "email" => "s.mark.toms+siteplot@gmail.com"
            ],
            "content" => base64_encode($blockType->component)
        ];


        if (count($blockType->repositories) > 0) {
            for ($x = 0; $x < count($blockType->repositories); $x++) {
                $url = 'https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/' . $blockType->file_name;
                $token = $blockType->repositories[$x]->personal_access_token;
                
                // Try to get file from github
                // If file exist, update with sha
                // If file doesn't exist create a new one

                $this->CreateFile($data, $url, $token);
            }
        }
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
