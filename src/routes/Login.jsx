import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motdepasse,
    });

    if (error) {
      console.log("Tentative de connexion avec :", email, motdepasse);
      setErreur("Email ou mot de passe incorrect.");
    } else {
      // ✅ Recharge l'app proprement une fois connecté
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Logo GT */}
        <div className="flex justify-center mb-4">
          <img src="/gtlogo.png" alt="GT Logistics" className="h-12 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Connexion
        </h2>

        {erreur && (
          <p className="text-red-600 mb-4 text-sm text-center">{erreur}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Mot de passe"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Se connecter
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4">
          Vous n’avez pas encore de compte ?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
            type="button"
          >
            Créer un compte
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
