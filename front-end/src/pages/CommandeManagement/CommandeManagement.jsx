// pages/CommandeManagement/CommandeManagement.jsx
import React, { useEffect, useState } from "react";
import { orderService } from "../../services/orderService";

// IMPORTANT : les clés ici doivent correspondre aux VALEURS renvoyées par le backend
// (enum Etat), pas aux noms des clés de l'enum TypeScript.
const ETAT_LABELS = {
  "en attente": { label: "En attente", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  "en cours de preparation": { label: "En préparation", color: "bg-blue-100 text-blue-700 border-blue-300" },
  "annule": { label: "Annulée", color: "bg-red-100 text-red-700 border-red-300" },
  "livre": { label: "Livrée", color: "bg-green-100 text-green-700 border-green-300" },
};

const Badge = ({ etat }) => {
  const config = ETAT_LABELS[etat] || { label: etat, color: "bg-gray-100 text-gray-700 border-gray-300" };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.label}
    </span>
  );
};

const CommandeManagement = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null); // ID de la commande dépliée
  const [actionLoading, setActionLoading] = useState(null); // ID en cours d'action
  const [filter, setFilter] = useState("TOUS");

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setCommandes(data);
    } catch (err) {
      setError("Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const handleAccepter = async (id) => {
    setActionLoading(id + "_accepter");
    try {
      await orderService.accepter(id);
      await fetchCommandes();
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de l'acceptation.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAnnuler = async (id) => {
    if (!window.confirm("Confirmer l'annulation de cette commande ?")) return;
    setActionLoading(id + "_annuler");
    try {
      await orderService.annuler(id);
      await fetchCommandes();
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de l'annulation.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredCommandes = filter === "TOUS"
    ? commandes
    : commandes.filter((c) => c.etat === filter);

  // Stats — basées sur les valeurs réelles de l'enum backend
  const stats = {
    total: commandes.length,
    enAttente: commandes.filter((c) => c.etat === "en attente").length,
    enPreparation: commandes.filter((c) => c.etat === "en cours de preparation").length,
    annulees: commandes.filter((c) => c.etat === "annule").length,
  };

  return (
    <div className="p-6">
      {/* Titre */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des commandes</h1>
        <p className="text-gray-500 text-sm mt-1">Acceptez ou annulez les commandes clients</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "border-l-gray-400", bg: "bg-white" },
          { label: "En attente", value: stats.enAttente, color: "border-l-yellow-400", bg: "bg-yellow-50" },
          { label: "En préparation", value: stats.enPreparation, color: "border-l-blue-400", bg: "bg-blue-50" },
          { label: "Annulées", value: stats.annulees, color: "border-l-red-400", bg: "bg-red-50" },
        
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-gray-200 border-l-4 ${s.color} rounded-lg p-4 shadow-sm`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["TOUS", "en attente", "en cours de preparation", "annule"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === f
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-green-500 hover:text-green-600"
            }`}
          >
            {f === "TOUS" ? "Toutes" : ETAT_LABELS[f]?.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-400">
          <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Chargement...
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>
      ) : filteredCommandes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Aucune commande trouvée
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCommandes.map((commande) => (
            <div key={commande.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

              {/* Header de la commande */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors gap-3"
                onClick={() => setExpanded(expanded === commande.id ? null : commande.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Icône expand */}
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === commande.id ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>

                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      #{commande.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {commande.client?.prenom} {commande.client?.nom} — {commande.client?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-8 sm:ml-0">
                  <Badge etat={commande.etat} />
                  <span className="font-bold text-green-700 text-sm whitespace-nowrap">
                    {parseFloat(commande.total).toFixed(2)} DT
                  </span>

                  {/* Actions */}
                  {commande.etat === "en attente" && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleAccepter(commande.id)}
                        disabled={actionLoading === commande.id + "_accepter"}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {actionLoading === commande.id + "_accepter" ? "..." : "✓ Accepter"}
                      </button>
                      <button
                        onClick={() => handleAnnuler(commande.id)}
                        disabled={actionLoading === commande.id + "_annuler"}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {actionLoading === commande.id + "_annuler" ? "..." : "✕ Refuser"}
                      </button>
                    </div>
                  )}

                  {commande.etat === "en cours de preparation" && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleAnnuler(commande.id)}
                        disabled={actionLoading === commande.id + "_annuler"}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {actionLoading === commande.id + "_annuler" ? "..." : "✕ Annuler"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Détails dépliables */}
              {expanded === commande.id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Infos client */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Informations client
                      </h3>
                      <div className="space-y-1.5 text-sm text-gray-700">
                        <p><span className="font-medium">Nom :</span> {commande.client?.prenom} {commande.client?.nom}</p>
                        <p><span className="font-medium">Email :</span> {commande.client?.email}</p>
                        <p><span className="font-medium">Téléphone :</span> {commande.client?.telephone}</p>
                        {commande.client?.adresses?.length > 0 && (
                          <p>
                            <span className="font-medium">Adresse :</span>{" "}
                            {commande.client.adresses[0].rue}, {commande.client.adresses[0].ville},{" "}
                            {commande.client.adresses[0].gouvernorat} {commande.client.adresses[0].codePostal}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Lignes de commande */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Articles commandés
                      </h3>

                      {commande.orderLines?.length > 0 ? (
                        <div className="space-y-2">
                          {commande.orderLines.map((line, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2">
                              <div className="flex items-center gap-3">
                                {line.produit?.imageUrl && (
                                  <img
                                    src={line.produit.imageUrl}
                                    alt={line.produit?.nom}
                                    className="w-10 h-10 object-cover rounded-md border"
                                  />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-800">{line.produit?.nom || "Produit supprimé"}</p>
                                  <p className="text-xs text-gray-500">Qté : {line.quantite} × {parseFloat(line.prix).toFixed(2)} DT</p>
                                </div>
                              </div>
                              <p className="font-semibold text-sm text-green-700">
                                {(line.quantite * parseFloat(line.prix)).toFixed(2)} DT
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">Aucun article trouvé pour cette commande.</p>
                      )}

                      {/* Total */}
                      <div className="flex justify-end mt-3 pt-3 border-t border-gray-200">
                        <p className="font-bold text-gray-800">
                          Total : <span className="text-green-700">{parseFloat(commande.total).toFixed(2)} DT</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandeManagement;