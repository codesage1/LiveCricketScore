import React from 'react';
import { MatchProvider } from './context/MatchContext';
import { SocketProvider } from './context/SocketContext';
import { MatchList } from './components/MatchList/MatchList';
import { MatchDetails } from './components/MatchDetails/MatchDetails';

function App() {
  return (
    <SocketProvider>
      <MatchProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Cricket Live Score
              </h1>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MatchList />
              </div>
              <div>
                <MatchDetails />
              </div>
            </div>
          </main>
        </div>
      </MatchProvider>
    </SocketProvider>
  );
}

export default App;