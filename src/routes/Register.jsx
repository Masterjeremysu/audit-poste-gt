import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { User, Briefcase, Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    poste: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErreur("Erreur lors de l'inscription : " + error.message);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) {
      setErreur("Erreur : ID utilisateur introuvable.");
      return;
    }

    const { error: insertError } = await supabase.from("utilisateurs").insert([
      {
        id: userId,
        nom: form.nom,
        poste: form.poste,
        email: form.email,
        role_app: "utilisateur",
      },
    ]);

    if (insertError) {
      setErreur("Erreur lors de l'enregistrement du profil : " + insertError.message);
    } else {
      setMessage("🎉 Compte créé avec succès !");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-sky-700 to-indigo-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Créer un compte
        </h2>

        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm text-center">
            {message}
          </div>
        )}
        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="text"
              name="nom"
              placeholder="Nom complet"
              value={form.nom}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute top-3 left-3 text-gray-400" size={18} />
            <select
              name="poste"
              value={form.poste}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Créer mon compte
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
