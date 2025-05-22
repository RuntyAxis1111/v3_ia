export async function fetchLatestNews(q: string) {
  try {
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
    if (!apiKey) {
      console.error('Missing News API key');
      return null;
    }

    const url = `https://newsapi.org/v2/everything?` +
                `q=${encodeURIComponent(q)}&language=es&sortBy=publishedAt&pageSize=1&apiKey=${apiKey}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('News API error:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    
    if (!data.articles?.length) {
      return null;
    }
    
    const { title, url: link, source, publishedAt } = data.articles[0];
    return { 
      title, 
      link, 
      source: source.name, 
      date: publishedAt.slice(0, 10) 
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}