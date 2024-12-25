# Cricket Live Score Application

A real-time cricket score tracking application built with React, TypeScript, and Socket.IO. The application features live match updates, detailed scorecards, and match information.

## Features

- Real-time match updates using WebSocket
- Live scoring with detailed match statistics
- Match filtering (Live, Upcoming, Completed)
- Detailed match information including venue and team details
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Project Structure

```
cricket-live-score/
├── src/               # Frontend source files
│   ├── components/    # React components
│   ├── context/      # React context providers
│   └── types/        # TypeScript type definitions
└── server/           # Backend server
    └── src/          # Server source files
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on http://localhost:3001

### Frontend Setup

1. Open a new terminal in the project root directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on http://localhost:5173

## Development

- Frontend is built with Vite + React + TypeScript
- Backend uses Express + Socket.IO
- Styling is done with Tailwind CSS
- Real-time updates are handled through Socket.IO

## API Endpoints

- `GET /api/matches` - Get all cricket matches
- WebSocket events:
  - `match:update` - Real-time match updates

## Environment Variables

Frontend:
- `VITE_WS_URL` - WebSocket server URL (defaults to ws://localhost:3001)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 