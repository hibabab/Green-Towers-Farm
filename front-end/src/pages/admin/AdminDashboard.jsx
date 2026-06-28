// pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduits } from '../../services/produitService';
import { clientService } from '../../services/clientService';
import { orderService } from '../../services/orderService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    clients: 0,
    orders: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [products, clients, orders] = await Promise.all([
          getAllProduits(),
          clientService.getAll(),
          orderService.getAll(),
        ]);

        setStats({
          products: products.length,
          clients: clients.length,
          orders: orders.length,
          pendingOrders: orders.filter((o) => o.etat === 'en attente').length,
        });

        // Trier les commandes par date (les plus récentes) et en garder 5
        const sorted = orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentOrders(sorted);
      } catch (err) {
        console.error('Erreur chargement stats :', err);
        setError('Impossible de charger les données du tableau de bord.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-8">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Tableau de bord</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Produits"
          value={stats.products}
          icon={
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />
        <StatCard
          title="Clients"
          value={stats.clients}
          icon={
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />
        <StatCard
          title="Commandes"
          value={stats.orders}
          icon={
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
        <StatCard
          title="En attente"
          value={stats.pendingOrders}
          icon={
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          bgColor="bg-orange-50"
          borderColor="border-orange-200"
        />
      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-green-100 bg-green-50/50 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-green-800">Dernières commandes</h2>
          <Link
            to="/admin/commandes"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            Voir toutes →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-100">
            <thead className="bg-green-50/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  Statut
                </th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Aucune commande récente
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-green-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.client?.prenom} {order.client?.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                      {parseFloat(order.total).toFixed(2)} DT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.etat === 'en attente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.etat === 'confirme'
                            ? 'bg-blue-100 text-blue-800'
                            : order.etat === 'livre'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.etat}
                      </span>
                    </td>
                   
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant pour une carte statistique
const StatCard = ({ title, value, icon, bgColor, borderColor }) => (
  <div className={`${bgColor} border ${borderColor} rounded-xl p-6 shadow-sm flex items-center gap-4`}>
    <div className="p-3 bg-white rounded-full shadow-md">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600 uppercase">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;