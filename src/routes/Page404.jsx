// ✅ PAGE 404 FUN & STYLÉE — Astronaute perdu 🚀
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowLeftCircle } from 'lucide-react';

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 via-blue-800 to-indigo-700 text-white px-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-[120px] font-black leading-none mb-2">404</h1>
        <p className="text-2xl font-semibold mb-6">Oups ! Cette page a disparu dans l’espace 🪐</p>
        <p className="mb-6 text-lg max-w-md mx-auto">L'astronaute chargé de cette route semble s’être perdu… mais pas de panique, vous pouvez retourner au tableau de bord !</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-100 transition"
        >
          <ArrowLeftCircle className="mr-2" /> Retour à l'accueil
        </Link>
      </div>

      <div className="mt-10 animate-float">
        <Rocket size={64} className="text-white opacity-60" />
      </div>
    </div>
  );
};

export default Page404;
