use Illuminate\Support\Facades\Http;

class SupabaseService
{
    private $baseUrl;
    private $apiKey;

    public function __construct()
    {
        $this->baseUrl = env('SUPABASE_URL');
        $this->apiKey = env('SUPABASE_API_KEY');
    }

    public function getAll($table)
    {
        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
            'Authorization' => 'Bearer ' . $this->apiKey
        ])->get("{$this->baseUrl}/rest/v1/{$table}", [
            'select' => '*',
        ]);

        return $response->json();
    }
}
