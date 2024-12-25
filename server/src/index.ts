import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"]
  }
});

// Sample match data
const matches = [
  {
    id: "1",
    status: "LIVE",
    teams: {
      home: {
        id: "team1",
        name: "India",
        shortName: "IND",
        players: []
      },
      away: {
        id: "team2",
        name: "Australia",
        shortName: "AUS",
        players: []
      }
    },
    venue: {
      id: "venue1",
      name: "MCG",
      city: "Melbourne",
      country: "Australia"
    },
    startTime: new Date(),
    lastUpdated: new Date(),
    currentInnings: {
      battingTeam: "team1",
      bowlingTeam: "team2",
      runs: 245,
      wickets: 3,
      overs: 35.2,
      currentBatsmen: {
        striker: {
          playerId: "player1",
          runs: 85,
          balls: 92,
          fours: 8,
          sixes: 2
        },
        nonStriker: {
          playerId: "player2",
          runs: 45,
          balls: 51,
          fours: 4,
          sixes: 1
        }
      },
      currentBowler: {
        playerId: "player3",
        overs: 8,
        maidens: 1,
        runs: 45,
        wickets: 2
      }
    }
  }
];

// Enable CORS
app.use(cors());

// API endpoint for matches
app.get('/api/matches', (req, res) => {
  res.json(matches);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit match updates every 30 seconds
  const updateInterval = setInterval(() => {
    if (matches[0].currentInnings) {
      matches[0].currentInnings.runs += Math.floor(Math.random() * 2);
      matches[0].lastUpdated = new Date();
      socket.emit('match:update', matches[0]);
    }
  }, 30000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(updateInterval);
  });
});

// Start server
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 