import React, { useState, useEffect, useRef } from 'react';
import { createProduit, updateProduit } from '../../../services/produitService';

// ProductForm.jsx
const CATEGORIES = [
  { value: 'Systèmes',    label: 'Systèmes' },
  { value: 'Solutions',   label: 'Solutions' },
  { value: 'Accessoires', label: 'Accessoires' },
];

const BASE_URL = 'http://localhost:3000';

const ProductForm = ({ isOpen, onClose, title, produitToEdit, onSuccess }) => {
  const fileInputRef = useRef(null);

  const emptyForm = {
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie: '',
    imageUrl: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* ── pré-remplir en mode édition ── */
  useEffect(() => {
    if (produitToEdit) {
      setForm({
        nom: produitToEdit.nom || '',
        description: produitToEdit.description || '',
        prix: produitToEdit.prix ?? '',
        stock: produitToEdit.stock ?? '',
        categorie: produitToEdit.categorie || '',
        imageUrl: produitToEdit.imageUrl || '',
      });
      setImagePreview(
        produitToEdit.imageUrl
          ? `${BASE_URL}/${produitToEdit.imageUrl.replace(/\\/g, '/')}`
          : null
      );
      setImageFile(null);
    } else {
      setForm(emptyForm);
      setImagePreview(null);
      setImageFile(null);
    }
    setErrors({});
  }, [produitToEdit, isOpen]);

  if (!isOpen) return null;

  /* ── validation ── */
  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Le nom est requis';
    if (!form.description.trim()) e.description = 'La description est requise';
    if (!form.prix || isNaN(form.prix) || Number(form.prix) <= 0)
      e.prix = 'Prix invalide';
    if (form.stock === '' || isNaN(form.stock) || Number(form.stock) < 0)
      e.stock = 'Stock invalide';
    if (!form.categorie) e.categorie = 'Catégorie requise';
    return e;
  };

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((prev) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nom', form.nom);
      formData.append('description', form.description);
      formData.append('prix', form.prix);
      formData.append('stock', form.stock);
      formData.append('categorie', form.categorie);
      if (imageFile) formData.append('image', imageFile);

      if (produitToEdit) {
        await updateProduit(produitToEdit.id, formData);
      } else {
        await createProduit(formData);
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ global: 'Une erreur est survenue. Réessayez.' });
    } finally {
      setLoading(false);
    }
  };

  /* ── render ── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto dark:bg-gray-800">

        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title || (produitToEdit ? 'Modifier le produit' : 'Ajouter un produit')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Erreur globale */}
          {errors.global && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
              {errors.global}
            </div>
          )}

          {/* Upload image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image du produit
            </label>

            {imagePreview ? (
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-50">
                <img src={imagePreview} alt="preview" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-green-600 dark:text-green-400">Cliquer pour importer</span> ou glisser-déposer
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — max 5 MB</p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Grid champs */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Nom */}
            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                Nom du produit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Ex: Engrais NPK 15-15-15"
                className={`w-full text-sm rounded-lg px-3 py-2.5 border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nom ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              />
              {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Décrivez le produit..."
                className={`w-full text-sm rounded-lg px-3 py-2.5 border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${errors.description ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            {/* Prix */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                Prix (DT) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">DT</span>
                <input
                  type="number"
                  name="prix"
                  value={form.prix}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full text-sm rounded-lg pl-9 pr-3 py-2.5 border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.prix ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
                />
              </div>
              {errors.prix && <p className="mt-1 text-xs text-red-500">{errors.prix}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={`w-full text-sm rounded-lg px-3 py-2.5 border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.stock ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              />
              {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
            </div>

            {/* Catégorie */}
            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <select
                name="categorie"
                value={form.categorie}
                onChange={handleChange}
                className={`w-full text-sm rounded-lg px-3 py-2.5 border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.categorie ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              >
                <option value="">Sélectionner une catégorie</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.categorie && <p className="mt-1 text-xs text-red-500">{errors.categorie}</p>}
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {loading ? 'Enregistrement...' : produitToEdit ? 'Mettre à jour' : 'Ajouter le produit'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;