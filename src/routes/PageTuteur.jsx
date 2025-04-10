// ✅ PAGE TUTEUR — Suivi & Alertes de validation (amélioré)
// ➕ Alerte temporaire (60 sec) + bouton de validation

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, Bell, BadgeCheck } from 'lucide-react';

const PageTuteur = () => {
  const [alerte, setAlerte] = useState(null);
  const [valide, setValide] = useState([]);

  const tutorats = [
    {
      id: 1,
      nom: "Julie Perrin",
      titre: "TOURNÉE CSP",
      poste: "Opérateur Silicium",
      progression: 100,
      signature: true,
      feedback: "Très bonne formation, complète et claire.",
    },
    {
      id: 2,
      nom: "Ali Rahmani",
      titre: "TOURNÉE CSP",
      poste: "Opérateur",
      progression: 72,
      signature: true,
      feedback: "J’ai eu un souci sur la dernière étape avec le quiz.",
    },
  ];

  useEffect(() => {
    const nouveau = tutorats.find(t => t.progression === 100 && t.signature);
    if (nouveau) {
      setAlerte(nouveau);
      const timeout = setTimeout(() => setAlerte(null), 60000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleValider = (id) => {
    setValide([...valide, id]);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧑‍🏫 Tableau de bord Tuteur</h1>

      {/* ✅ Bloc stats validés */}
      <div className="mb-8 p-6 bg-white rounded shadow-sm border max-w-xl">
        <h2 className="text-lg font-semibold mb-3">📊 Statistiques</h2>
        <p className="text-sm text-gray-700">Nombre total de tutorés : <strong>{tutorats.length}</strong></p>
        <p className="text-sm text-gray-700">Parcours validés : <strong>{valide.length}</strong></p>
        <p className="text-sm text-gray-700">Taux de validation : <strong>{((valide.length / tutorats.length) * 100).toFixed(0)}%</strong></p>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧑‍🏫 Tableau de bord Tuteur</h1>

      {alerte && (
        <div className="mb-6 p-4 rounded-lg bg-blue-100 text-blue-800 flex items-center gap-3">
          <Bell className="w-5 h-5" />
          <p><strong>{alerte.nom}</strong> a terminé son parcours <strong>{alerte.titre}</strong> !</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorats.map((tut) => (
          <Card key={tut.id} className="p-5">
            <h2 className="text-lg font-semibold">👤 {tut.nom}</h2>
            <p className="text-sm text-gray-600">🎓 {tut.titre} — {tut.poste}</p>
            <p className="text-sm text-gray-500 mt-2">✔️ Signature : {tut.signature ? 'Oui' : 'Non'}</p>
            <p className="text-sm text-gray-500">📈 Progression : {tut.progression}%</p>
            <p className="text-sm italic mt-2">💬 "{tut.feedback}"</p>
            <div className="flex justify-between items-center mt-4">
              <Button variant="outline"><Eye className="w-4 h-4 mr-1" /> Voir détails</Button>
              {tut.progression >= 85 && tut.signature && (
                valide.includes(tut.id) ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1"><BadgeCheck className="w-4 h-4" /> Validé</span>
                ) : (
                  <Button variant="default" onClick={() => handleValider(tut.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" /> Valider
                  </Button>
                )
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageTuteur;
