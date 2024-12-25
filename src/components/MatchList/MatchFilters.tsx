import React, { useState } from 'react';
import { MatchStatus } from '../../types/match';

export const MatchFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<MatchStatus | 'ALL'>('ALL');

  const filters: Array<{ label: string; value: MatchStatus | 'ALL' }> = [
    { label: 'All', value: 'ALL' },
    { label: 'Live', value: 'LIVE' },
    { label: 'Upcoming', value: 'UPCOMING' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  return (
    <div className="flex space-x-2 p-2 bg-white rounded-lg shadow-sm">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setActiveFilter(value)}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeFilter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};