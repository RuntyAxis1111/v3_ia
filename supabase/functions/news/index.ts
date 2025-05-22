const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const newsApiKey = Deno.env.get('NEWSAPI_KEY');
    if (!newsApiKey) {
      throw new Error('News API key not configured');
    }

    const url = new URL(req.url);
    const params = url.searchParams;

    // Construct News API URL with the provided query parameters
    const newsApiUrl = new URL('https://newsapi.org/v2/everything');
    params.forEach((value, key) => {
      newsApiUrl.searchParams.append(key, value);
    });

    const response = await fetch(newsApiUrl, {
      headers: {
        'X-Api-Key': newsApiKey,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid News API key');
      }
      throw new Error(`News API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in news function:', error);
    
    const status = error.message.includes('API key') ? 401 : 500;
    
    return new Response(
      JSON.stringify({
        error: error.message,
      }), {
        status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});