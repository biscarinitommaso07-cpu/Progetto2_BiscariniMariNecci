import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

// Attacca il JWT a ogni richiesta
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginGoogle    = (credential) => api.post('/auth/google', { credential });
export const getPrenotazioni = (params)    => api.get('/api/prenotazioni', { params });
export const creaPrenotazione = (data)     => api.post('/api/prenotazioni', data);
export const eliminaPrenotazione = (id)    => api.delete(`/api/prenotazioni/${id}`);
export const getAule   = ()                => api.get('/api/aule');
export const getClassi = ()                => api.get('/api/classi');