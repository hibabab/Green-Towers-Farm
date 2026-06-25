// ProductsToolbar.jsx
import React, { useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';

const ProductsToolbar = ({ onSearch }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [produitToEdit, setProduitToEdit] = useState(null);

  const handleOpen = () => {
    setProduitToEdit(null); // ✅ s'assurer que c'est un ajout, pas une édition
    setShowPopup(true);
  };

  return (
    <div className="justify-center flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 mx-4 py-4 border-t border-gray-200 dark:border-gray-700">

      <ProductForm
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={produitToEdit ? "Modifier produit" : "Ajouter produit"}
        produitToEdit={produitToEdit}
      />

      {/* Search */}
      <div className="w-full md:w-1/2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            onChange={(e) => onSearch && onSearch(e.target.value)} // ✅ prop onSearch optionnelle
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3">

        {/* Add Product */}
        <button
          onClick={handleOpen}
          type="button"
          className="flex items-center whitespace-nowrap justify-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors"
        >
          <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Ajouter produit
        </button>

        {/* Filter Button */}
       

      </div>

    </div>
  );
};

export default ProductsToolbar;