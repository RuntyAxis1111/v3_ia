import React from 'react';
import { User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ChatBubbleProps {
  message: Message;
  isLatest: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isLatest }) => {
  const isUser = message.role === 'user';
  
  // Split the assistant message to separate the news section if it exists
  let mainContent = message.content;
  let newsSection = null;
  
  if (!isUser && message.content.includes('Nota de actualidad')) {
    const parts = message.content.split(/(?=Nota de actualidad)/);
    mainContent = parts[0];
    if (parts.length > 1) {
      newsSection = parts[1];
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full mb-4 max-w-container mx-auto',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        'flex max-w-[80%] md:max-w-[70%]',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}>
        <div className={cn(
          'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
          isUser ? 'bg-primary-100 ml-2' : 'bg-primary-100 mr-2'
        )}>
          {isUser ? (
            <User className="w-4 h-4 text-primary-600" />
          ) : (
            <span className="text-sm font-semibold text-primary-600">TI</span>
          )}
        </div>
        
        <div className={cn(
          'flex flex-col overflow-hidden rounded-2xl px-4 py-3',
          isUser ? 'bg-user text-gray-800' : 'bg-bot text-gray-800'
        )}>
          <div className="whitespace-pre-wrap">
            {mainContent}
          </div>
          
          {newsSection && (
            <div className="mt-4 pt-3 border-t border-primary-100 text-sm">
              {newsSection}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;