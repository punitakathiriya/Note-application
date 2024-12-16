const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { isAfter } = require('date-fns');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory database
let notes = [];

// Helper function to check and update note status
const updateNoteStatus = (note) => {
  if (note.deadline && isAfter(new Date(), new Date(note.deadline))) {
    note.status = 'archived';
  }
  return note;
};

// Get all notes
app.get('/notes', (req, res) => {
  const updatedNotes = notes.map(updateNoteStatus);
  res.json({data:updatedNotes,status:"1",message:"Notes Get Successfully."});
});

// Add a new note
app.post('/notes', (req, res) => {
  const { title, description, deadline } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({data:[],status:"0",error: 'Title and description are required'} );
  }

  if (title.length > 50) {
    return res.status(400).json({data:[],status:"0",error: 'Title must be less than 50 characters'});
  }

  if (description.length > 200) {
    return res.status(400).json({data:[],status:"0",error: 'Description must be less than 200 characters' });
  }

  const newNote = {
    id: uuidv4(),
    title,
    description,
    deadline: deadline || null,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(200).json({data:newNote,status:"1",message:"Notes created Successfully."});
});

// Remove a note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({data:[],status:"0",error: 'Note not found' });
  }

  notes = notes.filter(note => note.id !== id);
  res.status(200).json({data:[],status:"1",message:'Note deleted successfully' });
});

// Edit a note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({data:[],status:"0",error: 'Note not found' });
  }

  const note = notes[noteIndex];
  
  // Check if note is archived
  if (note.status === 'archived') {
    return res.status(400).json({data:[],status:"0",error:'Cannot edit archived notes' });
  }

  if (title && title.length > 50) {
    return res.status(400).json({data:[],status:"0",error:'Title must be less than 50 characters' });
  }

  if (description && description.length > 200) {
    return res.status(400).json({data:[],status:"0",error: 'Description must be less than 200 characters' });
  }

  notes[noteIndex] = {
    ...note,
    title: title || note.title,
    description: description || note.description,
    deadline: deadline || note.deadline,
  };

  res.json({data:notes[noteIndex],status:"1",message:'Note updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});