import React from 'react';
import { DisputeChat } from './components/DisputeChat';
import { useDisputeStore } from './store/disputeStore';
import { Scale } from 'lucide-react';

function App() {
  const { currentSession, createSession } = useDisputeStore();

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Dispute Resolution</h1>
            <p className="text-gray-600 text-center mb-8">
              Resolve conflicts fairly and efficiently with the help of AI mediation.
            </p>
            <button
              onClick={createSession}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Start New Resolution
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <DisputeChat disputeId={currentSession.id} />;
}

export default App;