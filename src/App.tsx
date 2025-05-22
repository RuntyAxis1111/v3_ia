import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatList from './components/ChatList';
import ChatInput from './components/ChatInput';
import { Message } from './components/ChatBubble';
import { generateId } from './lib/utils';
import { sendChatMessage } from './lib/api';

// Welcome messages to be shown only once
const WELCOME_MESSAGES: Message[] = [
  {
    id: generateId(),
    role: 'assistant',
    content: '¡Bienvenido a PALF Assistant! Estoy aquí para ayudarte a consultar métricas e insights de redes sociales. ¿En qué puedo ayudarte hoy?'
  },
  {
    id: generateId(),
    role: 'assistant',
    content: '🛈 Aún estamos en proceso de aprobación de permisos para Instagram y TikTok; por eso sus paneles pueden verse sin datos recientes.'
  },
  {
    id: generateId(),
    role: 'assistant',
    content: '🛈 Estamos trabajando en la conexión que extraerá todas las noticias sobre "Pase a la Fama". Cuando esté lista, las encontrarás en la pestaña PUBLIC RELATIONS de los dashboards de PALF.'
  },
  {
    id: generateId(),
    role: 'assistant',
    content: '🛈 Este modelo sigue en entrenamiento, así que su margen de error puede ser relativamente volátil.'
  }
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Show welcome messages when the app loads
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('hasShownWelcome') === 'true';
    
    if (!hasShownWelcome) {
      setMessages(WELCOME_MESSAGES);
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }, []);
  
  const handleSendMessage = async (content: string) => {
    // Add user message to the chat
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get messages for API call (excluding welcome messages if this is the first user message)
      const messagesForApi = messages.length > 0 ? 
        messages.filter(msg => !WELCOME_MESSAGES.some(wm => wm.id === msg.id)) : 
        [];
      
      // Send message to API
      const responseContent = await sendChatMessage([...messagesForApi, userMessage]);
      
      // Add assistant response to the chat
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden max-w-container mx-auto w-full">
        <ChatList messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;