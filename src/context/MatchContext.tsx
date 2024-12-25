import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Match } from '../types/match';
import { useSocket } from './SocketContext';

interface MatchState {
  matches: Match[];
  selectedMatch?: Match;
  loading: boolean;
  error?: Error;
}

interface MatchContextType extends MatchState {
  selectMatch: (matchId: string) => void;
  refreshMatches: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

type MatchAction =
  | { type: 'SET_MATCHES'; payload: Match[] }
  | { type: 'SELECT_MATCH'; payload: string }
  | { type: 'UPDATE_MATCH'; payload: Match }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error };

const matchReducer = (state: MatchState, action: MatchAction): MatchState => {
  switch (action.type) {
    case 'SET_MATCHES':
      return { ...state, matches: action.payload, loading: false };
    case 'SELECT_MATCH':
      return {
        ...state,
        selectedMatch: state.matches.find((m) => m.id === action.payload),
      };
    case 'UPDATE_MATCH':
      return {
        ...state,
        matches: state.matches.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
        selectedMatch:
          state.selectedMatch?.id === action.payload.id
            ? action.payload
            : state.selectedMatch,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(matchReducer, {
    matches: [],
    loading: true,
  });
  const socket = useSocket();

  useEffect(() => {
    refreshMatches();
    
    if (socket) {
      socket.on('match:update', (match: Match) => {
        dispatch({ type: 'UPDATE_MATCH', payload: match });
      });
    }

    return () => {
      if (socket) {
        socket.off('match:update');
      }
    };
  }, [socket]);

  const refreshMatches = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('http://localhost:3001/api/matches');
      const data = await response.json();
      dispatch({ type: 'SET_MATCHES', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    }
  };

  const selectMatch = (matchId: string) => {
    dispatch({ type: 'SELECT_MATCH', payload: matchId });
  };

  return (
    <MatchContext.Provider
      value={{ ...state, selectMatch, refreshMatches }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};