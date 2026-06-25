import React from "react";

const BASE_URL = "http://localhost:3000";

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  return `${BASE_URL}/${imageUrl.replace(/\\/g, "/")}`;
};

const ProductDetails = ({ productInfo }) => {
  return (
    <div className="w-full h-full flex flex-row">

      {/* Partie gauche — Image (50%) */}
      <div className="w-1/2 h-full relative bg-white flex items-center justify-center">
        {getImageUrl(productInfo.imageUrl) ? (
          <div className="w-full h-[70%]">
            <img
              src={getImageUrl(productInfo.imageUrl)}
              alt={productInfo.nom}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-[70%] flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Partie droite — Informations (50%) */}
      <div className="w-1/2 h-full bg-white p-8 flex flex-col justify-center overflow-auto">
        
        {/* Nom */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {productInfo.nom}
        </h2>
        
        {/* Badge Nouveau */}
        {productInfo.isNew && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mb-4 w-fit">
            Nouveau
          </span>
        )}

        {/* Prix */}
        <p className="text-3xl font-bold text-gray-800 mb-6">
          {productInfo.prix} <span className="text-lg font-normal text-gray-400">DT</span>
        </p>

        <div className="space-y-3">
          {/* Catégorie */}
          <div>
            <span className="text-gray-400 text-sm">Catégorie : </span>
            <span className="text-gray-700 font-medium">{productInfo.categorie || "—"}</span>
          </div>

          {/* Stock */}
          <div>
            <span className="text-gray-400 text-sm">Stock : </span>
            <span className="text-gray-700 font-medium">{productInfo.stock ?? "—"}</span>
          </div>

          {/* Vendus */}
          <div>
            <span className="text-gray-400 text-sm">Vendus : </span>
            <span className="text-gray-700 font-medium">{productInfo.vendus ?? 0}</span>
          </div>

          {/* Ajouté le */}
          <div>
            <span className="text-gray-400 text-sm">Ajouté le : </span>
            <span className="text-gray-700 font-medium">
  {productInfo.creeLe
    ? new Date(productInfo.creeLe).toLocaleDateString("fr-TN")
    : "—"}
</span>
          </div>

          {/* Description */}
          <div className="pt-4">
            <p className="text-gray-400 text-sm mb-1">Description :</p>
            <p className="text-gray-600">
              {productInfo.description || "Aucune description."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;