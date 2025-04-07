import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const SessionExpiree = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-500">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Session expirée</h1>
        <p className="text-gray-600 mb-6">
          Votre session a expiré pour des raisons de sécurité. Veuillez vous reconnecter pour continuer.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  );
};

export default SessionExpiree;
