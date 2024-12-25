import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';
import { MapPin, Clock, Timer } from 'lucide-react';

interface ScoreHeaderProps {
  match: Match;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ match }) => {
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
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
      <div className="space-y-4">
        {/* Match Status and Time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Timer className={`w-4 h-4 ${match.status === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            <span
              className={`${getStatusStyle(match.status)} text-white text-xs px-3 py-1 rounded-full font-medium`}
            >
              {match.status}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {format(new Date(match.startTime), 'PPP')}
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {match.teams.home.name}
            </span>
            <span className="text-gray-400 dark:text-gray-500 mx-3">vs</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {match.teams.away.name}
            </span>
          </h2>
        </div>

        {/* Current Score */}
        {match.currentInnings && (
          <div className="text-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {match.currentInnings.runs}
              <span className="text-gray-400 dark:text-gray-300">/</span>
              {match.currentInnings.wickets}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-300 mt-1">
              {match.currentInnings.overs} overs
            </div>
          </div>
        )}

        {/* Venue */}
        <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {match.venue.name}, {match.venue.city}, {match.venue.country}
          </span>
        </div>
      </div>
    </div>
  );
};