import React, { useRef, useEffect } from 'react';
import ChatBubble, { Message } from './ChatBubble';

interface ChatListProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-hidden">
      {messages.map((message, index) => (
        <ChatBubble 
          key={message.id} 
          message={message} 
          isLatest={index === messages.length - 1}
        />
      ))}
      
      {isLoading && (
        <div className="flex w-full mb-4 max-w-container mx-auto justify-start">
          <div className="flex max-w-[80%] md:max-w-[70%] flex-row">
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-primary-100 mr-2">
              <div className="w-4 h-4 text-primary-600 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary-600/30 animate-ping"></div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-2xl px-4 py-3 bg-bot text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatList;