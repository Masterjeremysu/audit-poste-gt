import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    console.log("Formulaire envoyé !");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: motdepasse,
    });

    if (error) {
      setErreur('Email ou mot de passe incorrect.');
      console.log("Erreur de connexion :", error.message);
    } else {
      console.log("Connexion réussie !");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Connexion
        </h2>

        {erreur && (
          <p className="text-red-500 mb-4 text-sm text-center">{erreur}</p>
        )}

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>

        {/* Lien vers la page d'inscription */}
        <div className="text-sm text-center text-gray-600 mt-4">
          Vous n’avez pas encore de compte ?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline"
            type="button"
          >
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
