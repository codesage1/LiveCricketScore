import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';
import { Trophy } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'bg-red-500';
      case 'UPCOMING':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`${getStatusColor(
            match.status
          )} text-white text-xs px-2 py-1 rounded-full`}
        >
          {match.status}
        </span>
        <span className="text-sm text-gray-500">
          {format(new Date(match.startTime), 'MMM d, h:mm a')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{match.teams.home.shortName}</span>
            {match.status === 'COMPLETED' &&
              match.currentInnings?.battingTeam === match.teams.home.id && (
                <Trophy className="w-4 h-4 text-yellow-500" />
              )}
          </div>
          {match.currentInnings && (
            <span className="font-medium">
              {match.currentInnings.runs}/{match.currentInnings.wickets}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{match.teams.away.shortName}</span>
            {match.status === 'COMPLETED' &&
              match.currentInnings?.battingTeam === match.teams.away.id && (
                <Trophy className="w-4 h-4 text-yellow-500" />
              )}
          </div>
          {match.previousInnings?.[0] && (
            <span className="font-medium">
              {match.previousInnings[0].runs}/{match.previousInnings[0].wickets}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {match.venue.name}, {match.venue.city}
      </div>
    </div>
  );
};