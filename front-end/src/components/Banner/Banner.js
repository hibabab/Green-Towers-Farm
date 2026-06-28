// src/components/Banner/Banner.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Import des images avec l'extension .png
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => setDocActive(next),
    appendDots: (dots) => (
      <div style={{ position: "absolute", top: "50%", left: "7%", transform: "translateY(-50%)" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? { width: "30px", color: "#262626", borderRight: "3px #262626 solid", padding: "8px 0", cursor: "pointer" }
            : { width: "30px", color: "transparent", borderRight: "3px white solid", padding: "8px 0", cursor: "pointer" }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div style={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)" }}>
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? { width: "25px", color: "#262626", borderRight: "3px #262626 solid", cursor: "pointer", fontSize: "12px" }
                  : { width: "25px", color: "transparent", borderRight: "3px white solid", cursor: "pointer", fontSize: "12px" }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        <Link to="/offer">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img src={img1} alt="Offre printemps" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold">Green Tower Farm</h2>
                <p className="text-lg mt-2">-L’excellence agricole à portée de main</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/offer">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img src={img2} alt="Nouveautés" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold">Nouveaux produits</h2>
                <p className="text-lg mt-2">Découvrez notre nouvelle collection</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/offer">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img src={img3} alt="Livraison offerte" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold">Green Tower Farm</h2>
                <p className="text-lg mt-2">L’excellence agricole à portée de main</p>
              </div>
            </div>
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;