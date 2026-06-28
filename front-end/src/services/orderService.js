// services/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const orderService = {
  /**
   * Crée une commande complète avec client + adresse + lignes de commande
   * @param {Object} formData - Données du formulaire
   * @param {Array}  products - Produits depuis Redux ({ _id, quantity })
   * @returns {Promise<Order>}
   */
  createOrder: async (formData, products) => {
    const payload = {
      client: {
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        adresses: [
          {
            gouvernorat: formData.gouvernorat,
            ville: formData.ville,
            codePostal: formData.codePostal,
            rue: formData.rue,
          },
        ],
      },
      orderLines: products.map((item) => ({
        produitId: item._id,
        quantite: item.quantity,
      })),
    };

    const response = await axios.post(`${API_URL}/orders`, payload);
    return response.data;
  },

  /**
   * Récupère toutes les commandes
   */
  getAll: () =>
    axios.get(`${API_URL}/orders`).then((res) => res.data),

  /**
   * Récupère une commande par ID
   */
  getById: (id) =>
    axios.get(`${API_URL}/orders/${id}`).then((res) => res.data),

  /**
   * Accepte une commande
   */
  accepter: (id) =>
    axios.patch(`${API_URL}/orders/${id}/accepter`).then((res) => res.data),

  /**
   * Annule une commande
   */
  annuler: (id) =>
    axios.patch(`${API_URL}/orders/${id}/annuler`).then((res) => res.data),
};