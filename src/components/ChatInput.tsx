import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 pt-3 pb-4 px-4">
      <form 
        onSubmit={handleSubmit}
        className="max-w-container mx-auto flex items-end gap-2"
      >
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-300">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu consulta..."
            className="w-full bg-transparent py-3 px-4 resize-none outline-none max-h-[200px] min-h-[56px]"
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || isLoading}
          className="flex items-center justify-center h-[56px] w-[56px] bg-primary-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;