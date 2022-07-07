<?php

namespace App\Observers;

use App\Models\Repository;
use Illuminate\Support\Facades\Http;

class RepositoryObserver
{
    public function CreateRepository(array $data, String $token)
    {
        $response = Http::withHeaders([
                    "Authorization" => $token,
                ])->withBody(
                    json_encode($data),
                    'application/json'
                )->post('https://api.github.com/user/repos');
        return $response;
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
     * Handle the Repository "created" event.
     *
     * @param  \App\Models\Repository  $repository
     * @return void
     */
    public function created(Repository $repository)
    {
        $data = [
            "name" => $repository->name,
            "auto_init" => false,
            "private" => true
        ];

        $token = $repository->personal_access_token;

        // Create repositry via GitHub
        $response = json_decode($this->CreateRepository($data, $token)->body());

        // Confirm pathing
        $targetRepository = Repository::find($repository->id);
        $targetRepository->path = $response->full_name;
        $targetRepository->saveQuietly();
        
        // Initialize ReadME.md
        $data = [
            "message" => "Creating Repository",
            "committer" => [
                "name" => "Siteplot Bot",
                "email" => "s.mark.toms+siteplot@gmail.com"
            ],
            "content" => "IyBTZWNvbmRhcnkgQ29tcG9uZW50cwoKQ29tcG9uZW50IGxpYnJhcnkgZ2VuZXJhdGVkIGJ5IFNpdGVwbG90CgpSZXBvIENyZWF0ZWQgd2l0aCB0aGUgZm9sbG93aW5nIHNldHRpbmdzOgpgYGAKbmFtZTogU2Vjb25kYXJ5IENvbXBvbmVudHMKcGF0aDogc2l0ZXBsb3QvU2Vjb25kYXJ5Q29tcG9uZW50cwpwZXJzb25hbF9hY2Nlc3NfdG9rZW46ICoqKioqKioqKioqKioqKmRrZHNrcwpgYGAKCkFsbCBzdXBwb3J0aW5nIGNvbXBvbmVudHMgY2FuIGJlIGZvdW5kIGluIHRoZSBgYGAvY29tcG9uZW50c2BgYCBmb2xkZXIKVGhpcyBjb21wb25lbnQgbGlicmFyeSBjYW4gYmUgbW91bnRlZCBpbiBhbnkgY3VzdG9tIHByb2plY3QgdmlhIGEgW3N1Ym1vZHVsZV0oaHR0cHM6Ly9naXQtc2NtLmNvbS9ib29rL2VuL3YyL0dpdC1Ub29scy1TdWJtb2R1bGVzKQ=="
        ];

        $url = 'https://api.github.com/repos/' . $targetRepository->path . '/contents/README.md';

        $this->CreateFile($data, $url, $token);
    }

    /**
     * Handle the Repository "updated" event.
     *
     * @param  \App\Models\Repository  $repository
     * @return void
     */
    public function updated(Repository $repository)
    {
        //
    }

    /**
     * Handle the Repository "deleted" event.
     *
     * @param  \App\Models\Repository  $repository
     * @return void
     */
    public function deleted(Repository $repository)
    {
        //
    }

    /**
     * Handle the Repository "restored" event.
     *
     * @param  \App\Models\Repository  $repository
     * @return void
     */
    public function restored(Repository $repository)
    {
        //
    }

    /**
     * Handle the Repository "force deleted" event.
     *
     * @param  \App\Models\Repository  $repository
     * @return void
     */
    public function forceDeleted(Repository $repository)
    {
        //
    }
}
