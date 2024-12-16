# Notes Application

A full-stack notes application with React frontend and Node.js backend. The application allows users to create, edit, and manage notes with deadlines and automatic archiving features.

## Project Structure

```
├── backend/                 # Backend Node.js application
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
│
├── frontend/               # Frontend React application
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   │   ├── form/     # Reusable form components
│   │   │   ├── modals/   # Modal components
│   │   │   └── notes/    # Note-related components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Application entry point
│   └── package.json       # Frontend dependencies
│
└── README.md              # Project documentation
```

## Features

- Create notes with title and description
- Set deadlines for notes
- Automatic archiving of notes when deadline passes
- Edit active notes
- Delete notes
- View both active and archived notes
- Form validation
- Responsive design

## Technical Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Hot Toast for notifications
- Headless UI for modals
- Date-fns for date handling
- Axios for API requests

### Backend
- Node.js
- Express.js
- CORS for cross-origin requests
- UUID for generating unique IDs
- In-memory data storage

## Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on port 3001.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5005


## License

MIT License - feel free to use this project for your own purposes.