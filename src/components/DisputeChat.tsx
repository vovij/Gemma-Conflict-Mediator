import React from 'react';
import { useDispute } from '../hooks/useDispute';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Scale } from 'lucide-react';

interface DisputeChatProps {
  disputeId: string;
}

export const DisputeChat: React.FC<DisputeChatProps> = ({ disputeId }) => {
  const { dispute, messages, sendMessage, isLoading } = useDispute(disputeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Scale className="text-blue-600" />
            <h1 className="text-xl font-semibold">AI Dispute Resolution</h1>
          </div>
          <div className="text-sm text-gray-500">
            Session ID: {disputeId}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Scale size={48} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Welcome to AI Dispute Resolution</h2>
              <p className="text-gray-600 max-w-md">
                Start by explaining your perspective. Our AI mediator will help guide the conversation
                towards a resolution.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        disabled={!dispute || dispute.status === 'waiting'}
      />
    </div>
  );
};