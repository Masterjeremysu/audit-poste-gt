// ✅ PAGE TUTORÉ — Étape 1 : Accueil du parcours tutorat personnalisé (interconnectée)
// Ajout : redirection vers la timeline du parcours

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PageTutore = () => {
  const navigate = useNavigate();

  const parcours = {
    titre: "TOURNÉE CSP",
    poste: "Opérateur Silicium",
    duree: "3h30",
    etapes: 6,
    tuteur: "Guillaume MAITI",
    statut: "non démarré",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🎓 Mon Parcours Tutoré</h1>

      <Card className="p-6 max-w-3xl mx-auto shadow-md">
        <h2 className="text-2xl font-semibold mb-2">🚀 {parcours.titre}</h2>
        <p className="text-gray-600 mb-1">🎯 Poste visé : <strong>{parcours.poste}</strong></p>
        <p className="text-gray-600 mb-1">📋 Nombre d’étapes : <strong>{parcours.etapes}</strong></p>
        <p className="text-gray-600 mb-1">⏱️ Durée estimée : <strong>{parcours.duree}</strong></p>
        <p className="text-gray-600 mb-4">🧑‍🏫 Tuteur assigné : <strong>{parcours.tuteur}</strong></p>

        <div className="flex gap-3">
          <Button onClick={() => navigate('/parcours-timeline')}>👁️ Voir mon parcours</Button>
          <Button variant="outline">📁 Voir les documents liés</Button>
        </div>

        <div className="mt-6 text-sm text-gray-400 italic">
          Statut : <span className="text-blue-600">{parcours.statut}</span>
        </div>
      </Card>
    </div>
  );
};

export default PageTutore;
