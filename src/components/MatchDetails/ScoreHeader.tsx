import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';

interface ScoreHeaderProps {
  match: Match;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {match.teams.home.name} vs {match.teams.away.name}
        </h2>
        <span className="text-sm text-gray-500">
          {format(new Date(match.startTime), 'PPP')}
        </span>
      </div>

      <div className="space-y-2">
        {match.currentInnings && (
          <div className="text-2xl font-bold">
            {match.currentInnings.runs}/{match.currentInnings.wickets}{' '}
            <span className="text-lg text-gray-600">
              ({match.currentInnings.overs} ov)
            </span>
          </div>
        )}
        <div className="text-sm text-gray-600">
          {match.venue.name}, {match.venue.city}, {match.venue.country}
        </div>
      </div>
    </div>
  );
};