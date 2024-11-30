import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { User, Users, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === 'ai';
  const isUser1 = message.role === 'user1';

  return (
    <div className={`flex gap-3 ${isAI ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isAI ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {isAI ? <Bot size={20} /> : isUser1 ? <User size={20} /> : <Users size={20} />}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {isAI ? 'AI Mediator' : isUser1 ? 'Participant 1' : 'Participant 2'}
          </span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="mt-1 text-gray-700">{message.content}</p>
      </div>
    </div>
  );
};