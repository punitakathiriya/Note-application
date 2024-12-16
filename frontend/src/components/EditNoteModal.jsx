import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export const EditNoteModal = ({ note, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: note.title,
    description: note.description,
    deadline: note.deadline
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(note.id, formData);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded max-w-md w-full mx-auto p-6">
            <Dialog.Title className="text-lg font-medium">Edit Note</Dialog.Title>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={200}
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

