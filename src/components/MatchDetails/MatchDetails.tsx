import React from 'react';
import { useMatch } from '../../context/MatchContext';
import { ScoreHeader } from './ScoreHeader';
import { LiveScore } from './LiveScore';
import { Scorecard } from './Scorecard';
import { MatchInfo } from './MatchInfo';

export const MatchDetails: React.FC = () => {
  const { selectedMatch, loading } = useMatch();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!selectedMatch) {
    return (
      <div className="text-center text-gray-500 p-4">
        Select a match to view details
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScoreHeader match={selectedMatch} />
      {selectedMatch.status === 'LIVE' && (
        <LiveScore
          currentInnings={selectedMatch.currentInnings}
          match={selectedMatch}
        />
      )}
      <Scorecard match={selectedMatch} />
      <MatchInfo match={selectedMatch} />
    </div>
  );
};