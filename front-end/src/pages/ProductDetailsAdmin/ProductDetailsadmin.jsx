import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDetails from "../../components/productManagemnt/ProductDetails/ProductDetails";

const ProductDetailsadmin = () => {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    setProductInfo(location.state?.item);
  }, [location]);

  if (!productInfo) return null;

  return (
     <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
      
          
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center"></div>
        <ProductDetails productInfo={productInfo} />
      </div>
    </div>
  );
};

export default ProductDetailsadmin;