// pages/Order/OrderForm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import { orderService } from "../../services/orderService";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [], totalAmt = 0, shippingCharge = 8 } = location.state || {}

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    gouvernorat: "",
    ville: "",
    codePostal: "",
    rue: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  if (!products || products.length === 0) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-titleFont font-bold mb-4">Panier vide</h1>
        <p className="text-gray-500 mb-6">
          Vous devez ajouter des produits avant de passer commande.
        </p>
        <Link to="/shop">
          <button className="bg-primeColor text-white px-8 py-3 hover:bg-black duration-300 font-semibold">
            Voir la boutique
          </button>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.prenom.trim()) newErrors.prenom = "Entrez votre prénom";
    if (!form.nom.trim()) newErrors.nom = "Entrez votre nom";
    if (!form.email.trim()) newErrors.email = "Entrez votre email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email invalide";
    if (!form.telephone.trim()) newErrors.telephone = "Entrez votre téléphone";
    if (!form.gouvernorat.trim()) newErrors.gouvernorat = "Champ requis";
    if (!form.ville.trim()) newErrors.ville = "Champ requis";
    if (!form.codePostal.trim()) newErrors.codePostal = "Champ requis";
    if (!form.rue.trim()) newErrors.rue = "Champ requis";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      await orderService.createOrder(form, products);
      setSuccessMsg(`Merci ${form.prenom} ${form.nom} ! Votre commande a été soumise avec succès.`);
      dispatch(resetCart());
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Une erreur est survenue lors de l'envoi de la commande.";
      setApiError(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full py-3 px-4 border border-gray-300 rounded-lg text-base outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition";
  const labelClass = "block text-sm text-black font-semibold mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  if (successMsg) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center">
        <div className="inline-block p-8 bg-green-50 rounded-xl border border-green-200 max-w-md">
          <div className="text-4xl mb-4">✅</div>
          <p className="font-bold text-green-700 text-xl mb-2">Commande soumise !</p>
          <p className="text-gray-600 mb-6">{successMsg}</p>
          <div className="flex gap-3 justify-center">
            <Link to="/shop">
              <button className="px-6 py-2 bg-primeColor text-white font-semibold rounded hover:bg-black duration-300">
                Continuer les achats
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-2 border border-gray-400 text-gray-700 font-semibold rounded hover:bg-gray-100 duration-300">
                Accueil
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <h1 className="font-titleFont font-bold text-3xl mb-2 text-center">
        Finaliser la commande
      </h1>
      <p className="text-center text-gray-500 mb-10 text-sm">
        Vérifiez vos articles et renseignez vos informations de livraison
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

        {/* ── Récapitulatif produits ── */}
        <div className="w-full lg:w-2/5">
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#F5F7F7] px-6 py-4 border-b">
              <h2 className="font-titleFont font-semibold text-lg">
                Récapitulatif ({products.length} article{products.length > 1 ? "s" : ""})
              </h2>
            </div>

            <div className="divide-y max-h-80 overflow-y-auto">
              {products.map((item) => (
                <div key={item._id} className="flex items-center gap-4 px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Qté : {item.quantity} × {item.price} DT
                    </p>
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap">
                    {(item.quantity * item.price).toFixed(2)} DT
                  </p>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span>{totalAmt.toFixed(2)} DT</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span>{shippingCharge} DT</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span>
                <span>{(totalAmt + shippingCharge).toFixed(2)} DT</span>
              </div>
            </div>
          </div>

          <Link
            to="/cart"
            className="block text-center text-sm text-gray-500 hover:text-black mt-4 underline duration-200"
          >
            ← Modifier le panier
          </Link>
        </div>

        {/* ── Formulaire client ── */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/5 bg-white p-8 rounded-xl shadow-sm border space-y-5"
        >
          <h2 className="font-titleFont font-semibold text-xl mb-1">
            Informations personnelles
          </h2>

          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              ⚠️ {apiError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Prénom *</label>
              <input
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Votre prénom"
              />
              {errors.prenom && <p className={errorClass}>! {errors.prenom}</p>}
            </div>
            <div>
              <label className={labelClass}>Nom *</label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Votre nom"
              />
              {errors.nom && <p className={errorClass}>! {errors.nom}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              type="email"
              placeholder="exemple@email.com"
            />
            {errors.email && <p className={errorClass}>! {errors.email}</p>}
          </div>

          <div>
            <label className={labelClass}>Téléphone *</label>
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className={inputClass}
              type="tel"
              placeholder="Ex: 22334455"
            />
            {errors.telephone && <p className={errorClass}>! {errors.telephone}</p>}
          </div>

          <h2 className="font-titleFont font-semibold text-xl pt-2">
            Adresse de livraison
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Gouvernorat *</label>
              <input
                name="gouvernorat"
                value={form.gouvernorat}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Ex: Tunis"
              />
              {errors.gouvernorat && <p className={errorClass}>! {errors.gouvernorat}</p>}
            </div>
            <div>
              <label className={labelClass}>Ville *</label>
              <input
                name="ville"
                value={form.ville}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Ex: Ariana"
              />
              {errors.ville && <p className={errorClass}>! {errors.ville}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Code postal *</label>
              <input
                name="codePostal"
                value={form.codePostal}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Ex: 2080"
              />
              {errors.codePostal && <p className={errorClass}>! {errors.codePostal}</p>}
            </div>
            <div>
              <label className={labelClass}>Rue *</label>
              <input
                name="rue"
                value={form.rue}
                onChange={handleChange}
                className={inputClass}
                type="text"
                placeholder="Ex: Rue de la Liberté"
              />
              {errors.rue && <p className={errorClass}>! {errors.rue}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primeColor text-white font-titleFont text-lg tracking-wide font-semibold hover:bg-black transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : `Confirmer la commande — ${(totalAmt + shippingCharge).toFixed(2)} DT`}
          </button>

          <p className="text-xs text-gray-400 text-center">* Champs obligatoires.</p>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;