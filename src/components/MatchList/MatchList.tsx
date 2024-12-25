import React from 'react';
import { useMatch } from '../../context/MatchContext';
import { MatchCard } from './MatchCard';
import { MatchFilters } from './MatchFilters';

export const MatchList: React.FC = () => {
  const { matches, loading, error, selectMatch } = useMatch();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading matches: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MatchFilters />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onClick={() => selectMatch(match.id)}
          />
        ))}
      </div>
    </div>
  );
};