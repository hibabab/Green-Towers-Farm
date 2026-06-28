import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 dark:bg-gray-800">

        {/* Icône */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
            <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
          Supprimer le produit
        </h3>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          {productName
            ? <>Voulez-vous vraiment supprimer <strong className="text-gray-700 dark:text-gray-200">« {productName} »</strong> ?</>
            : 'Voulez-vous vraiment supprimer ce produit ?'
          }{' '}
          Cette action est irréversible.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;