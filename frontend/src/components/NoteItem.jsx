import React from 'react';
import { format } from 'date-fns';
import { EditNoteModal } from './EditNoteModal';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const isArchived = note?.status === 'archived';
  
  return (
    <div className={`p-4 border rounded mb-4 ${isArchived ? 'bg-gray-100' : 'bg-white'}`}>
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="mt-2">{note.description}</p>
      {note.deadline && (
        <p className="text-sm text-gray-600 mt-2">
          Deadline: {format(new Date(note.deadline), 'PPp')}
        </p>
      )}
      <div className="mt-4 space-x-2">
        {!isArchived && (
          <EditNoteModal note={note} onEdit={onEdit} />
        )}
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;