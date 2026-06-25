import React from "react";
import Banner from "../../components/Banner/Banner";

import Sale from "../../components/home/Sale/Sale";


const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      
      <div className="max-w-container mx-auto px-4">
        <Sale />
      
        
      </div>
    </div>
  );
};

export default Home;
