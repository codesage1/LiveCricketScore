import React from 'react';
import { Match, Innings } from '../../types/match';

interface LiveScoreProps {
  currentInnings?: Innings;
  match: Match;
}

export const LiveScore: React.FC<LiveScoreProps> = ({ currentInnings, match }) => {
  if (!currentInnings) return null;

  const getBatsmanName = (playerId: string) => {
    const team =
      match.teams.home.id === currentInnings.battingTeam
        ? match.teams.home
        : match.teams.away;
    return (
      team.players.find((p) => p.id === playerId)?.name || 'Unknown Player'
    );
  };

  const getBowlerName = (playerId: string) => {
    const team =
      match.teams.home.id === currentInnings.bowlingTeam
        ? match.teams.home
        : match.teams.away;
    return (
      team.players.find((p) => p.id === playerId)?.name || 'Unknown Player'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Live Score</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">Batsman</div>
          <div className="text-right">R (B)</div>

          <div className="col-span-2">
            {getBatsmanName(currentInnings.currentBatsmen.striker.playerId)} *
          </div>
          <div className="text-right">
            {currentInnings.currentBatsmen.striker.runs} (
            {currentInnings.currentBatsmen.striker.balls})
          </div>

          <div className="col-span-2">
            {getBatsmanName(currentInnings.currentBatsmen.nonStriker.playerId)}
          </div>
          <div className="text-right">
            {currentInnings.currentBatsmen.nonStriker.runs} (
            {currentInnings.currentBatsmen.nonStriker.balls})
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">Bowler</div>
            <div className="text-right">O-M-R-W</div>

            <div className="col-span-2">
              {getBowlerName(currentInnings.currentBowler.playerId)}
            </div>
            <div className="text-right">
              {currentInnings.currentBowler.overs}-
              {currentInnings.currentBowler.maidens}-
              {currentInnings.currentBowler.runs}-
              {currentInnings.currentBowler.wickets}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};