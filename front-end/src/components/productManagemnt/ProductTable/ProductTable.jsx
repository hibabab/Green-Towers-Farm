
import React, { useState, useEffect } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import DeleteModal from '../Delete/delete';
import { getAllProduits, deleteProduit } from '../../../services/produitService';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'; // ✅ adapte selon ton backend

const ProductTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produits, setProduits] = useState([]);
  const [produitToEdit, setProduitToEdit] = useState(null);
  const [produitToDeleteId, setProduitToDeleteId] = useState(null);

  useEffect(() => {
    getAllProduits().then(data => {
      // Filtrer les produits où isDeleted === false
      const activeProduits = data.filter(produit => produit.isDeleted === false);
      setProduits(activeProduits);
    });
  }, []);

  const handleDelete = async () => {
    await deleteProduit(produitToDeleteId);
    // Mettre à jour la liste en filtrant le produit supprimé
    setProduits(produits.filter(p => p.id !== produitToDeleteId));
    setShowDeleteModal(false);
  };

  return (
    <div className="overflow-x-auto">

      <ProductForm
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Modifier produit"
        produitToEdit={produitToEdit}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">IMAGE</th>
            <th className="p-4">NOM</th>
            <th className="p-4">PRIX</th>
            <th className="p-4">CATÉGORIE</th>
            <th className="p-4">STOCK</th>
            <th className="p-4">VENDUS</th>
            <th className="p-4">STATUT</th> {/* Nouvelle colonne */}
            <th className="p-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {produits.map(produit => (
            <tr key={produit.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">

              {/* IMAGE */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {produit.id || '—'}
              </td>
              <td className="px-4 py-3">
                {produit.imageUrl ? (
                  <img
                    src={`${BASE_URL}/${produit.imageUrl.replace(/\\/g, '/')}`}
                    alt={produit.nom}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </td>

              {/* NOM */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {produit.nom || '—'}
              </td>

              {/* PRIX */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {produit.prix ? `${produit.prix} DT` : '—'}
              </td>

              {/* CATÉGORIE */}
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  {produit.categorie || '—'}
                </span>
              </td>

              {/* STOCK */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {produit.stock ?? '—'}
              </td>

              {/* VENDUS */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {produit.vendus ?? 0}
              </td>

              {/* STATUT - Badge NEW */}
              <td className="px-4 py-3">
                {produit.isNew === true && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                     NEW
                  </span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="px-5 py-3">
                <div className="flex items-center space-x-2">

                  {/* Details */}
                  <Link
                    to={`/admin/product/${produit.nom}`}
                    state={{ item: produit }}
                    className="flex items-center text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Détails
                  </Link>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => {
                      setProduitToEdit(produit);
                      setShowPopup(true);
                    }}
                    className="flex items-center text-green-600 text-sm font-medium rounded-lg "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      setProduitToDeleteId(produit.id);
                      setShowDeleteModal(true);
                    }}
                    className="flex items-center text-red-700 "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ProductTable;