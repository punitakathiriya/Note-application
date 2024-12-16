import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
  const activeNotes = notes?.filter(note => note.status !== 'archived');
  const archivedNotes = notes?.filter(note => note.status === 'archived');

  return (
    // Notes List Active and Archiev List
    <div>
      <h2 className="text-xl font-bold mb-4">Active Notes</h2>
      {activeNotes.length > 0 && (
      <div className="space-y-4">
        {activeNotes?.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
  )}
      {archivedNotes.length > 0 && (
        <>
          <h2 className="text-xl font-bold my-4">Archived Notes</h2>
          <div className="space-y-4">
            {archivedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NoteList;