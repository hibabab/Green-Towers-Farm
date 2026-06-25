import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { getAllProduits } from "../../../services/produitService";
import { useSearchParams } from "react-router-dom"; // ✅

const BASE_URL = "http://localhost:3000";

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  return `${BASE_URL}/${imageUrl.replace(/\\/g, "/")}`;
};

const Pagination = ({ itemsPerPage }) => {
  const [produits, setProduits] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchParams] = useSearchParams(); // ✅
  const selectedCategory = searchParams.get("category"); // ✅ "Systèmes" | "Accessoires" | "Solutions" | null

  useEffect(() => {
    getAllProduits().then((data) => {
      const activeProduits = data.filter((p) => p.isDeleted === false);
      setProduits(activeProduits);
    });
  }, []);

  // ✅ Filtre selon la catégorie de l'URL
  const filteredProduits = selectedCategory
    ? produits.filter((p) => p.categorie === selectedCategory)
    : produits;

  // ✅ Reset offset quand catégorie change
  useEffect(() => {
    setItemOffset(0);
  }, [selectedCategory]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProduits.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProduits.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProduits.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      {/* ✅ Titre catégorie active */}
      {selectedCategory && (
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Catégorie : <span className="text-emerald-600">{selectedCategory}</span>
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              imageUrl={getImageUrl(item.imageUrl)}
              nom={item.nom}
              prix={item.prix}
              categorie={item.categorie}
              description={item.description}
              stock={item.stock}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center py-10">
            Aucun produit dans cette catégorie.
          </p>
        )}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          containerClassName="flex gap-2 mt-6"
          activeClassName="bg-black text-white"
        />
      )}
    </div>
  );
};

export default Pagination;