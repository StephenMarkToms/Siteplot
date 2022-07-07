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

    public function GetFile(String $url, String $token)
    {
        $response = Http::withHeaders([
                    "Authorization" => $token,
                ])->get($url);
        return json_decode($response->body());
    }

    public function DeleteFile(String $fileUrl, String $sha, String $message, String $token)
    {
        $data = [
            "message" => $message,
            "sha" => $sha
        ];

        $response = Http::withHeaders([
            "Authorization" => $token,
        ])->withBody(
            json_encode($data),
            'application/json'
        )->delete($fileUrl);
        return $response;
    }

    public function ReplaceFile(String $repoUrl, array $data, String $oldFileName, String $newFileName, String $token)
    {
        $oldFileUrl = $repoUrl . $oldFileName;
        $newFileUrl = $repoUrl . $newFileName;

        $sha = $this->GetFile($oldFileUrl, $token)->sha;

        if (!is_null($sha)) {
            $this->DeleteFile($oldFileUrl, $sha, "Moving File to: " . $newFileName, $token);
        }

        $url = $repoUrl . $newFileName;
        $this->CreateFile($data, $url, $token);
    }

    public function pivotSynced(BlockType $blockType)
    {
        dd(($blockType->getOriginal()));
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
            "message" => "Syncing File",
            "committer" => [
                "name" => "Siteplot Bot",
                "email" => "s.mark.toms+siteplot@gmail.com"
            ],
            "content" => base64_encode($blockType->component)
        ];


        if (count($blockType->repositories) > 0) {
            for ($x = 0; $x < count($blockType->repositories); $x++) {
                $token = $blockType->repositories[$x]->personal_access_token;
                
                $getFile = $this->GetFile('https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/' . $blockType->getOriginal()['file_name'], $token);
                $fileExists = isset($getFile->sha);

                //Check if the file exists
                if ($fileExists) {
                    // Check changes and see if filename has changed
                    if (array_key_exists('file_name', $blockType->getChanges())) {
                        $repoUrl = 'https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/';
                        $this->ReplaceFile($repoUrl, $data, $blockType->getOriginal()['file_name'], $blockType->file_name, $token);
                    } else {
                        //update file
                        $url = 'https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/' . $blockType->file_name;
                        $data['sha'] = $getFile->sha;
                        $this->CreateFile($data, $url, $token);
                    }
                } else {
                    // If file doesn't exist create a new one
                    $url = 'https://api.github.com/repos/' . $blockType->repositories[$x]->path . '/contents/components/' . $blockType->file_name;
                    $this->CreateFile($data, $url, $token);
                }
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
