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

    public function makeGitHubCommit(array $data, String $url, String $token)
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
        $data = [
            "message" => "Updating File",
            "committer" => [
                "name" => "Siteplot Bot",
                "email" => "s.mark.toms+siteplot@gmail.com"
            ],
            "content" => base64_encode($blockType->component)
        ];

        $requests = [];

        if (count($blockType->repositories) > 0) {
            for ($x = 0; $x < count($blockType->repositories); $x++) {
                $url = 'https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/' . $blockType->file_name;
                $token = $blockType->repositories[$x]->personal_access_token;
                
                array_push($requests, $this->makeGitHubCommit($data, $url, $token));
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
