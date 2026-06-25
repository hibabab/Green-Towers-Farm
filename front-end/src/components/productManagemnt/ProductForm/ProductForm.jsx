import React from 'react';

const EnseignantForm = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative p-6 bg-white rounded-lg shadow dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title || "Ajouter un enseignant"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form>
          <div className="grid gap-4 mb-6 sm:grid-cols-2">
            
            {/* Nom */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Nom de l'enseignant"
                required
              />
            </div>

            {/* Prénom */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Prénom de l'enseignant"
                required
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email professionnel</label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="nom.prenom@institution.tn"
                required
              />
            </div>

            {/* CIN */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">N° CIN</label>
              <input
                type="text"
                maxLength="8"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Ex: 08765432"
                required
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
              <input
                type="tel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="+216 -- --- ---"
                required
              />
            </div>

            {/* Département (Enum) */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Département</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                <option value="">Sélectionner un département</option>
                <option value="IT">Informatique</option>
                <option value="GE">Génie Électrique</option>
                <option value="GM">Génie Mécanique</option>
                <option value="SEG">Sciences Économiques et Gestion</option>
              </select>
            </div>

            {/* Grade (Enum) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                <option value="">Sélectionner</option>
                <option value="assistant">Assistant</option>
                <option value="maitre_assistant">Maître Assistant</option>
                <option value="maitre_conf">Maître de Conférences</option>
                <option value="prof">Professeur</option>
                <option value="expert">Expert</option>
                <option value="ingenieur">Ingénieur</option>
              </select>
            </div>

            {/* Nature (Enum) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nature</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                <option value="">Sélectionner</option>
                <option value="permanent">Permanent</option>
                <option value="contractuelle">Contractuelle</option>
                <option value="vacataire">Vacataire</option>
              </select>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 border-t pt-4 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
            >
              Enregistrer l'enseignant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnseignantForm;