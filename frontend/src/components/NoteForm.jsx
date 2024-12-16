import React, { useState } from 'react';
import { toast } from 'react-hot-toast';


const NoteForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', deadline: '' });
      toast.success('Note created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create note');
    }
  };

  return (
    // Create Note Form
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title (max 50 characters)"
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
          placeholder="Description (max 200 characters)"
          maxLength={200}
          className="w-full p-2 border rounded h-24"
          required
        />
      </div>
      <div>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;