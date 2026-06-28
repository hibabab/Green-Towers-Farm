import axios from 'axios';

const API_URL = 'http://localhost:3000/produits';

// ─── helpers ───────────────────────────────────────────────
// Détecte si la data est déjà un FormData (upload image)
// ou un objet JSON simple
const getHeaders = (data) =>
  data instanceof FormData
    ? {} // axios gère Content-Type multipart automatiquement
    : { 'Content-Type': 'application/json' };

// ─── CRUD ──────────────────────────────────────────────────

/** Créer un produit (avec ou sans image) */
export const createProduit = async (data) => {
  const response = await axios.post(API_URL, data, {
    headers: getHeaders(data),
  });
  return response.data;
};

/** Tous les produits */
export const getAllProduits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/** Un produit par id */
export const getProduitById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/** Modifier un produit (avec ou sans image) */
export const updateProduit = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: getHeaders(data),
  });
  return response.data;
};

/** Suppression logique (isDeleted = true côté backend) */
export const deleteProduit = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};