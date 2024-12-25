import React from 'react';
import { useMatch } from '../../context/MatchContext';
import { ScoreHeader } from './ScoreHeader';
import { LiveScore } from './LiveScore';
import { Scorecard } from './Scorecard';
import { MatchInfo } from './MatchInfo';
import { Trophy } from 'lucide-react';

export const MatchDetails: React.FC = () => {
  const { selectedMatch, loading } = useMatch();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading match details...</p>
      </div>
    );
  }

  if (!selectedMatch) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <Trophy className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Match Selected</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a match from the list to view detailed information
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 min-h-[calc(100vh-4rem)] animate-fadeIn">
      <ScoreHeader match={selectedMatch} />
      {selectedMatch.status === 'LIVE' && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
          <LiveScore
            currentInnings={selectedMatch.currentInnings}
            match={selectedMatch}
          />
        </div>
      )}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <Scorecard match={selectedMatch} />
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <MatchInfo match={selectedMatch} />
      </div>
    </div>
  );
};