import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';
import { Trophy, Timer } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse';
      case 'UPCOMING':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'COMPLETED':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border border-gray-100 dark:border-gray-700"
    >
      <div className="p-5 space-y-4">
        {/* Header with status and time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Timer className={`w-4 h-4 ${match.status === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            <span
              className={`${getStatusStyle(
                match.status
              )} text-white text-xs px-3 py-1 rounded-full font-medium`}
            >
              {match.status}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {format(new Date(match.startTime), 'MMM d, h:mm a')}
          </span>
        </div>

        {/* Teams and Scores */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{match.teams.home.shortName.slice(0, 2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {match.teams.home.shortName}
                </span>
                {match.status === 'COMPLETED' &&
                  match.currentInnings?.battingTeam === match.teams.home.id && (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  )}
              </div>
            </div>
            {match.currentInnings && (
              <span className="font-bold text-gray-900 dark:text-white">
                {match.currentInnings.runs}/{match.currentInnings.wickets}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{match.teams.away.shortName.slice(0, 2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {match.teams.away.shortName}
                </span>
                {match.status === 'COMPLETED' &&
                  match.currentInnings?.battingTeam === match.teams.away.id && (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  )}
              </div>
            </div>
            {match.previousInnings?.[0] && (
              <span className="font-bold text-gray-900 dark:text-white">
                {match.previousInnings[0].runs}/{match.previousInnings[0].wickets}
              </span>
            )}
          </div>
        </div>

        {/* Venue */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
            <span>{match.venue.name},</span>
            <span>{match.venue.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
};