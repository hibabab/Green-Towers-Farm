import React, { useState } from "react";

const OrderForm = () => {
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
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.prenom.trim()) newErrors.prenom = "Entrez votre prénom";
    if (!form.nom.trim()) newErrors.nom = "Entrez votre nom";
    if (!form.email.trim()) newErrors.email = "Entrez votre email";
    if (!form.telephone.trim()) newErrors.telephone = "Entrez votre téléphone";
    if (!form.gouvernorat.trim()) newErrors.gouvernorat = "Entrez votre gouvernorat";
    if (!form.ville.trim()) newErrors.ville = "Entrez votre ville";
    if (!form.codePostal.trim()) newErrors.codePostal = "Entrez votre code postal";
    if (!form.rue.trim()) newErrors.rue = "Entrez votre rue";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMsg(`Merci ${form.prenom} ${form.nom}, votre commande a été enregistrée avec succès.`);
    setForm({ prenom: "", nom: "", email: "", telephone: "", gouvernorat: "", ville: "", codePostal: "", rue: "" });
  };

  const inputClass = "w-full py-3 px-4 border border-gray-300 rounded-lg text-base outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition";
  const labelClass = "block text-base text-black font-semibold mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <h1 className="font-titleFont font-semibold text-3xl mb-6 text-center text-green-600">
        Formulaire de Commande
      </h1>

      {successMsg ? (
        <div className="text-center">
          <div className="inline-block p-6 bg-green-50 rounded-lg border border-green-200">
            <p className="font-medium text-green-600 text-lg mb-2">✅ Commande confirmée !</p>
            <p className="font-medium text-gray-700">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg("")}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200"
            >
              Nouvelle commande
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm border space-y-6">

          {/* Prénom & Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Prénom *</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} className={inputClass} type="text" placeholder="Prénom" />
              {errors.prenom && <p className={errorClass}>! {errors.prenom}</p>}
            </div>
            <div>
              <label className={labelClass}>Nom *</label>
              <input name="nom" value={form.nom} onChange={handleChange} className={inputClass} type="text" placeholder="Nom" />
              {errors.nom && <p className={errorClass}>! {errors.nom}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email *</label>
            <input name="email" value={form.email} onChange={handleChange} className={inputClass} type="email" placeholder="exemple@email.com" />
            {errors.email && <p className={errorClass}>! {errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className={labelClass}>Téléphone *</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} className={inputClass} type="tel" placeholder="Ex: 22334455" />
            {errors.telephone && <p className={errorClass}>! {errors.telephone}</p>}
          </div>

          {/* Adresse */}
          <div>
            <label className={labelClass}>Adresse de livraison *</label>
            <div className="space-y-3">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input name="gouvernorat" value={form.gouvernorat} onChange={handleChange} className={inputClass} type="text" placeholder="Gouvernorat" />
                  {errors.gouvernorat && <p className={errorClass}>! {errors.gouvernorat}</p>}
                </div>
                <div>
                  <input name="ville" value={form.ville} onChange={handleChange} className={inputClass} type="text" placeholder="Ville" />
                  {errors.ville && <p className={errorClass}>! {errors.ville}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input name="codePostal" value={form.codePostal} onChange={handleChange} className={inputClass} type="text" placeholder="Code postal" />
                  {errors.codePostal && <p className={errorClass}>! {errors.codePostal}</p>}
                </div>
                <div>
                  <input name="rue" value={form.rue} onChange={handleChange} className={inputClass} type="text" placeholder="Rue" />
                  {errors.rue && <p className={errorClass}>! {errors.rue}</p>}
                </div>
              </div>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-titleFont text-lg tracking-wide font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Confirmer la commande
          </button>

          <p className="text-sm text-gray-500 text-center">
            * Champs obligatoires.
          </p>

        </form>
      )}
    </div>
  );
};

export default OrderForm;