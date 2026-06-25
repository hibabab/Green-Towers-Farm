import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import Flex from "../../designLayouts/Flex";
import Logo from "../../../assets/images/Logo.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [shopOpen, setShopOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const products = useSelector((state) => state.orebiReducer.products);

  useEffect(() => {
    const ResponsiveMenu = () => setShowMenu(window.innerWidth >= 667);
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".shop-menu") && !e.target.closest(".services-menu")) {
        setShopOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navBarList = [
    { _id: 1001, title: "Accueil", link: "/" },
    { _id: 1002, title: "Produits", link: "/shop" },
    { _id: 1003, title: "Services", link: "/services" },
    { _id: 1004, title: "Contact", link: "/contact" },
  ];

const shopDropdown = [
  { _id: 1, title: "Tous les produits", link: "/shop" },
  { _id: 2, title: "Système",           link: "/shop?category=Systèmes" },
  { _id: 3, title: "Accessoire",        link: "/shop?category=Accessoires" },
  { _id: 4, title: "Solution",          link: "/shop?category=Solutions" },
];

  const servicesDropdown = [
    { _id: 1, title: "Formation", link: "/formation" },
  ];

  return (
    <div className="w-full h-24 bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Image className="w-28 h-auto max-h-20 object-contain" imgSrc={Logo} />
          </Link>

          <div className="flex-1"></div>

          {/* Navigation */}
          {showMenu && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-8 text-base font-normal"
            >
              {navBarList.map(({ _id, title, link }) => (
                <li key={_id} className="relative">

                  {title === "Produits" ? (
                    <div className="shop-menu relative">
                      <button
                        onClick={() => setShopOpen(!shopOpen)}
                        className="text-gray-700 hover:text-emerald-700 transition-all duration-200 font-normal"
                      >
                        {title}
                      </button>

                      {shopOpen && (
                        <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md py-1 w-56 z-50 border border-gray-100">
                          {shopDropdown.map((item) => (
                            <li key={item._id}>
                              <NavLink
                                to={item.link}
                                onClick={() => setShopOpen(false)}
                                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                              >
                                {item.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : title === "Services" ? (
                    <div className="services-menu relative">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="text-gray-700 hover:text-emerald-700 transition-all duration-200 font-normal"
                      >
                        {title}
                      </button>

                      {servicesOpen && (
                        <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md py-1 w-56 z-50 border border-gray-100">
                          {servicesDropdown.map((item) => (
                            <li key={item._id}>
                              <NavLink
                                to={item.link}
                                onClick={() => setServicesOpen(false)}
                                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                              >
                                {item.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={link}
                      end={link === "/"}
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-emerald-700 transition-all duration-200 text-base font-normal ${isActive ? "font-semibold text-emerald-700" : ""}`
                      }
                    >
                      {title}
                    </NavLink>
                  )}
                </li>
              ))}
            </motion.ul>
          )}

          {/* Panier */}
          <Link to="/cart" className="relative ml-4">
            <div className="relative group">
              <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-emerald-700 transition-all duration-200" />
              {products.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {products.length}
                </span>
              )}
            </div>
          </Link>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;