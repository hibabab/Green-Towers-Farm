import axios from "axios";

const API_URL = "http://localhost:3000/produits";

// POST — créer un produit
export const createProduit = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// GET — tous les produits
export const getAllProduits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET — un produit par id
export const getProduitById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// PUT — modifier un produit
export const updateProduit = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// DELETE — supprimer un produit
export const deleteProduit = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};