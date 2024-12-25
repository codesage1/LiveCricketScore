import React from 'react';
import { Match } from '../../types/match';

interface ScorecardProps {
  match: Match;
}

export const Scorecard: React.FC<ScorecardProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Scorecard</h3>

      {match.previousInnings?.map((innings, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-medium mb-2">
            {match.teams.home.id === innings.battingTeam
              ? match.teams.home.name
              : match.teams.away.name}{' '}
            Innings
          </h4>
          <div className="text-xl font-bold">
            {innings.runs}/{innings.wickets}{' '}
            <span className="text-base text-gray-600">
              ({innings.overs} ov)
            </span>
          </div>
        </div>
      ))}

      {!match.previousInnings?.length && (
        <div className="text-gray-500">No innings data available</div>
      )}
    </div>
  );
};