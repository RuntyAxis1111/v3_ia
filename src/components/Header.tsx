import React from 'react';
import { MessageSquareText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 max-w-container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <MessageSquareText className="w-6 h-6 text-primary-600" />
          <span className="font-semibold text-xl">PALF Assistant</span>
        </div>
      </div>
    </header>
  );
};

export default Header;