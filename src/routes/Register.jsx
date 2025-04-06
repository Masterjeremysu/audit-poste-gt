import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    poste: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setMessage('');

    // 1. Création dans Supabase Auth
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErreur("Erreur lors de l'inscription : " + error.message);
      return;
    }

    // 2. Récupération de l'ID utilisateur depuis la session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id;

    if (!userId) {
      setErreur("Erreur : ID utilisateur introuvable.");
      return;
    }

    // 3. Ajout dans la table utilisateurs
    const { error: insertError } = await supabase.from('utilisateurs').insert([
      {
        id: userId,
        nom: form.nom,
        poste: form.poste,
        email: form.email,
        role_app: 'utilisateur',
      },
    ]);

    if (insertError) {
      setErreur("Erreur lors de l'enregistrement du profil : " + insertError.message);
    } else {
      setMessage('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Créer un compte
        </h2>

        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}
        {erreur && <p className="text-red-600 mb-4 text-sm">{erreur}</p>}

        <input
          type="text"
          name="nom"
          placeholder="Votre nom complet"
          value={form.nom}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <select
          name="poste"
          value={form.poste}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">-- Sélectionner votre poste --</option>
          <option>Responsable site</option>
          <option>Responsable d'activités PDT</option>
          <option>Adjoint PDT</option>
          <option>Leader PDT</option>
          <option>Responsable d'activités Silicium</option>
          <option>Leader Planning</option>
          <option>Leader Silicium</option>
          <option>Opérateur</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Créer mon compte
        </button>
      </form>
    </div>
  );
};

export default Register;
