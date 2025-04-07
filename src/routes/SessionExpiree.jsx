import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const SessionExpiree = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-orange-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center text-red-500 mb-6"
        >
          <AlertTriangle size={60} />
        </motion.div>

        <h1 className="text-3xl font-bold text-red-600 mb-3">Session expirée</h1>
        <p className="text-gray-700 text-md mb-2">
          Votre session a expiré pour des raisons de sécurité.
        </p>
        <p className="text-gray-700 text-sm mb-6">
          Redirection automatique dans <span className="font-bold">{countdown}</span> secondes...
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-md transition"
        >
          🔐 Revenir à la connexion maintenant
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SessionExpiree;
