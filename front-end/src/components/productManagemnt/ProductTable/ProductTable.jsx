import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductForm from '../ProductForm/ProductForm';
import DeleteModal from '../Delete/DeleteModal';
import { getAllProduits, deleteProduit } from '../../../services/produitService';

const BASE_URL = 'http://localhost:3000';

const CATEGORIES = ['Tous', 'Systèmes', 'Solutions', 'Accessoires'];

const BADGE_COLORS = {
  'Systèmes':    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Solutions':   'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Accessoires': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};
/* ────────────────────────────────── */

const ProductTable = () => {
  const [produits, setProduits]             = useState([]);
  const [loading, setLoading]               = useState(true);

  /* recherche & filtres */
  const [search, setSearch]                 = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [stockFilter, setStockFilter]       = useState('tous'); // tous | dispo | rupture

  /* modals */
  const [showForm, setShowForm]             = useState(false);
  const [produitToEdit, setProduitToEdit]   = useState(null);
  const [showDelete, setShowDelete]         = useState(false);
  const [produitToDelete, setProduitToDelete] = useState(null);

  /* ── fetch ── */
  const fetchProduits = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProduits();
      setProduits(data.filter((p) => !p.isDeleted));
    } catch (err) {
      console.error('Erreur chargement produits', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProduits(); }, [fetchProduits]);

  /* ── filtrage ── */
  const filtered = produits.filter((p) => {
    const matchSearch =
      p.nom?.toLowerCase().includes(search.toLowerCase()) ||
      p.categorie?.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'Tous' || p.categorie === categoryFilter;
    const matchStock =
      stockFilter === 'tous' ||
      (stockFilter === 'dispo' && p.stock > 0) ||
      (stockFilter === 'rupture' && p.stock === 0);
    return matchSearch && matchCat && matchStock;
  });

  /* ── delete ── */
  const handleDelete = async () => {
    if (!produitToDelete) return;
    await deleteProduit(produitToDelete.id);
    setProduits((prev) => prev.filter((p) => p.id !== produitToDelete.id));
    setShowDelete(false);
    setProduitToDelete(null);
  };

  /* ── open edit ── */
  const openEdit = (produit) => {
    setProduitToEdit(produit);
    setShowForm(true);
  };

  /* ── open add ── */
  const openAdd = () => {
    setProduitToEdit(null);
    setShowForm(true);
  };

  /* ── helpers ── */
  const imageUrl = (path) =>
    path ? `${BASE_URL}/${path.replace(/\\/g, '/')}` : null;

  /* ─────────────────────────────── */
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">

      {/* Modals */}
      <ProductForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        produitToEdit={produitToEdit}
        onSuccess={fetchProduits}
      />
      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        productName={produitToDelete?.nom}
      />

      {/* ── Toolbar ── */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

        {/* Recherche */}
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou catégorie..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Filtre catégorie */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c === 'Tous' ? 'Toutes catégories' : c}</option>
            ))}
          </select>

          {/* Filtre stock */}
         

          {/* Bouton ajouter */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        </div>
      </div>

      {/* ── Compteur résultats ── */}
      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
        {filtered.length} produit{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        {search && <span> pour « <strong>{search}</strong> »</span>}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400">
            <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Chargement...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-medium text-gray-500">Aucun produit trouvé</p>
            <p className="text-xs text-gray-400 mt-1">Essayez de modifier vos filtres ou ajoutez un produit</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-600">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Vendus</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((produit) => {
                const img = imageUrl(produit.imageUrl);
                const enRupture = produit.stock === 0;

                return (
                  <tr
                    key={produit.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      {img ? (
                        <img
                          src={img}
                          alt={produit.nom}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>

                    {/* Nom */}
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px] truncate">
                      {produit.nom || '—'}
                    </td>

                    {/* Catégorie */}
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_COLORS[produit.categorie] || BADGE_COLORS.AUTRE}`}>
                        {produit.categorie || '—'}
                      </span>
                    </td>

                    {/* Prix */}
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {produit.prix != null ? `${Number(produit.prix).toFixed(2)} DT` : '—'}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${enRupture ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        {produit.stock ?? '—'}
                      </span>
                    </td>

                    {/* Vendus */}
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {produit.vendus ?? 0}
                    </td>

                    {/* Statut */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {enRupture && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 w-fit">
                            Rupture
                          </span>
                        )}
                        {produit.isNew && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 w-fit">
                            NEW
                          </span>
                        )}
                        {!enRupture && !produit.isNew && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 w-fit">
                            Disponible
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {/* Détails */}
                        <Link
                          to={`/admin/product/${produit.nom}`}
                          state={{ item: produit }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                          title="Voir détails"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>

                        {/* Modifier */}
                        <button
                          type="button"
                          onClick={() => openEdit(produit)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors dark:text-green-400 dark:hover:bg-green-900/20"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Supprimer */}
                        <button
                          type="button"
                          onClick={() => {
                            setProduitToDelete(produit);
                            setShowDelete(true);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductTable;