import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { paginationItems } from "../../../constants";

const HeaderBottom = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] flex justify-center items-center py-6">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-[600px] h-[50px] bg-white flex items-center gap-2 px-6 rounded-xl shadow">
        
        <input
          className="flex-1 h-full outline-none placeholder:text-[#C4C4C4]"
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Rechercher un produit..."
        />

        <FaSearch className="w-5 h-5" />

        {/* Dropdown résultats */}
        {searchQuery && (
          <div className="w-full h-80 bg-white absolute top-16 left-0 z-50 overflow-y-scroll shadow-xl rounded">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(
                    `/product/${item.productName.toLowerCase().split(" ").join("")}`,
                    { state: { item } }
                  );
                  setSearchQuery("");
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
              >
                <img className="w-16" src={item.img} alt="product" />
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HeaderBottom;