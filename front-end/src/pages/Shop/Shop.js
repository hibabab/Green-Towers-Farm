import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import HeaderBottom from "../../components/home/Header/HeaderBottom";


const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  

  return (
    
    <div className="max-w-container  mx-auto px-4">
    <HeaderBottom/>
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full mt-10 flex justify-center items-center pb-20 gap-10">
  <Pagination itemsPerPage={itemsPerPage} />
</div>
      
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
