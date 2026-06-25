import axios from 'axios';

const API_URL = 'http://localhost:3000/clients';

export const clientService = {
  getAll: () =>
    axios.get(API_URL).then(res => res.data),

  bloquer: (id) =>
    axios.patch(`${API_URL}/${id}/bloquer`).then(res => res.data),

  debloquer: (id) =>
    axios.patch(`${API_URL}/${id}/debloquer`).then(res => res.data),
};