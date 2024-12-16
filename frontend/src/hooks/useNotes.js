import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notesApi';
import { toast } from 'react-hot-toast';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      const sortedEvents = data.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      setNotes(sortedEvents);
    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setNotes(prev => [...prev, newNote.data]);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (id, noteData) => {
    try {
     
      const updatedNote = await updateNote(id, noteData);
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote.data : note
      ));
      fetchNotes();
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  return {
    notes,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};