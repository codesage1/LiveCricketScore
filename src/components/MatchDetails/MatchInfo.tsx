import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface MatchInfoProps {
  match: Match;
}

export const MatchInfo: React.FC<MatchInfoProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Match Information</h3>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>
            {match.venue.name}, {match.venue.city}, {match.venue.country}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span>{format(new Date(match.startTime), 'PPPP')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{format(new Date(match.startTime), 'p')}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Teams</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-700">{match.teams.home.name}</h5>
            <ul className="text-sm text-gray-600">
              {match.teams.home.players.slice(0, 5).map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
              {match.teams.home.players.length > 5 && (
                <li className="text-gray-400">
                  +{match.teams.home.players.length - 5} more
                </li>
              )}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700">{match.teams.away.name}</h5>
            <ul className="text-sm text-gray-600">
              {match.teams.away.players.slice(0, 5).map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
              {match.teams.away.players.length > 5 && (
                <li className="text-gray-400">
                  +{match.teams.away.players.length - 5} more
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};