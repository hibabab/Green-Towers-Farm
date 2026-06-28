// pages/Cart/Cart.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(8); // frais fixes à 8 DT

  useEffect(() => {
    const price = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmt(price);
  }, [products]);

  // Pas besoin de recalculer shippingCharge, il reste fixe

  const handleProceedToOrder = () => {
    navigate("/order", { state: { products, totalAmt, shippingCharge } });
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Panier" />
      {products.length > 0 ? (
        <div className="pb-20">
          {/* En-tête du tableau */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Produit</h2>
            <h2>Prix</h2>
            <h2>Quantité</h2>
            <h2>Sous-total</h2>
          </div>

          {/* Liste des produits */}
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          {/* Bouton reset */}
          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Vider le panier
          </button>

          {/* Totaux + Bouton Commander */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Totaux du panier</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Sous-total
                  <span className="font-semibold tracking-wide font-titleFont">
                    {totalAmt.toFixed(2)} DT
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Frais de livraison
                  <span className="font-semibold tracking-wide font-titleFont">
                    {shippingCharge} DT
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {(totalAmt + shippingCharge).toFixed(2)} DT
                  </span>
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleProceedToOrder}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 font-semibold"
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Votre panier est vide.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Votre panier n'attend que vous. Remplissez-le avec nos produits !
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continuer les achats
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;