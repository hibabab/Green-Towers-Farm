import React, { useState, useEffect } from 'react';
import { clientService } from '../../../services/clientService';

const BloquerModal = ({ isOpen, onClose, onConfirm, clientName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Bloquer le client
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Êtes-vous sûr de vouloir bloquer <span className="font-medium text-gray-800 dark:text-white">{clientName}</span> ?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Bloquer
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [showBloquerModal, setShowBloquerModal] = useState(false);
  const [clientToBloquer, setClientToBloquer] = useState(null);

  useEffect(() => {
    clientService.getAll().then(data => {
      // Afficher uniquement les clients actifs
      setClients(data.filter(c => c.isactive === true));
    });
  }, []);

  const openBloquerModal = (client) => {
    setClientToBloquer(client);
    setShowBloquerModal(true);
  };

  const handleBloquer = async () => {
    const updated = await clientService.bloquer(clientToBloquer.id);
    // Retirer le client bloqué de la liste
    setClients(clients.filter(c => c.id !== updated.id));
    setShowBloquerModal(false);
    setClientToBloquer(null);
  };

  return (
    <div className="overflow-x-auto">

      <BloquerModal
        isOpen={showBloquerModal}
        onClose={() => setShowBloquerModal(false)}
        onConfirm={handleBloquer}
        clientName={clientToBloquer ? `${clientToBloquer.nom} ${clientToBloquer.prenom}` : ''}
      />
  <h1 className="text-2xl font-bold text-teal-600 mt-4 dark:text-white mb-4">
      Liste des clients
    </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">NOM ET PRÉNOM</th>
            <th className="p-4">EMAIL</th>
            <th className="p-4">TÉLÉPHONE</th>
            <th className="p-4">ADRESSE</th>
            <th className="p-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">

              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {client.nom} {client.prenom}
              </td>

              <td className="px-4 py-3">{client.email}</td>

              <td className="px-4 py-3">{client.telephone}</td>

              <td className="px-4 py-3">
                {client.adresses && client.adresses.length > 0
                  ? client.adresses.map((adr, i) => (
                      <div key={i}>
                        {adr.gouvernorat}, {adr.ville} {adr.codePostal}
                      </div>
                    ))
                  : '—'}
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={() => openBloquerModal(client)}
                  className="flex items-center text-red-600 text-sm font-medium hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524L13.477 14.89zm1.414-1.414L6.524 5.11A6 6 0 0114.89 13.476zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                  Bloquer
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;