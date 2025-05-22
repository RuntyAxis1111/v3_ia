import { Message } from '../components/ChatBubble';

export async function sendChatMessage(messages: Message[]) {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    // System prompt
    const systemMessage = {
      role: 'system',
      content: `Eres **PALF Assistant**. Tu misión:
• Genera reportes breves y accionables basados en los datos de Supabase.
• Usa SQL via supabase-js cuando el usuario pregunte por cifras o tendencias.
• Después de preparar la respuesta, adjunta una "Nota de actualidad" con la
  noticia más reciente sobre "Pase a la Fama" o "PALF" (título, medio, fecha, URL).
• Responde SIEMPRE en español y en tono profesional/respetuoso.
• Si no hay noticias en <24 h di:
  «No se encontraron noticias nuevas sobre PALF en las últimas 24 h.»`
    };
    
    // Format messages for OpenAI API
    const formattedMessages = [
      systemMessage,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];
    
    // Get news about PALF
    let newsData = null;
    try {
      newsData = await fetchNewsForPrompt();
    } catch (error) {
      console.warn('Failed to fetch news, continuing without news context:', error);
    }
    
    // Add news context to the last user message if available
    if (newsData && formattedMessages.length > 1) {
      const lastUserMsgIndex = formattedMessages.findIndex(msg => msg.role === 'user');
      if (lastUserMsgIndex !== -1) {
        formattedMessages[lastUserMsgIndex].content += `\n\nContexto de noticias: ${JSON.stringify(newsData)}`;
      }
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-0824',
        messages: formattedMessages,
        temperature: 0.3,
        stream: false
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al comunicarse con OpenAI');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

async function fetchNewsForPrompt() {
  try {
    // Use a proxy endpoint to avoid CORS issues
    const proxyUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/news`;
    const params = new URLSearchParams({
      q: 'pase a la fama OR PALF',
      language: 'es',
      sortBy: 'publishedAt',
      pageSize: '1'
    });
    
    const res = await fetch(`${proxyUrl}?${params}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('API key inválida o faltante para News API');
      }
      throw new Error(`Error al obtener noticias: ${res.status} ${res.statusText}`);
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
    throw error; // Propagate error to be handled by caller
  }
}