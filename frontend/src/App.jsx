import React from 'react';
import { Toaster } from 'react-hot-toast';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { useNotes } from './hooks/useNotes';

function App() {
  const { notes, loading, handleCreate, handleUpdate, handleDelete } = useNotes();

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notes App</h1>
      <NoteForm onSubmit={handleCreate} />
      <NoteList
        notes={notes}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;