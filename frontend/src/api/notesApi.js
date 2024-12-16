import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};