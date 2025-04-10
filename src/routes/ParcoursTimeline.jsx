// ✅ Étape 2 : Lancement du parcours tutoré avec timeline visuelle et actions par étape
// Objectif : affichage UX-friendly du déroulé du tutorat, avec actions, quiz, documents

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/Checkbox';


const ParcoursTimeline = () => {
  const [signature, setSignature] = useState(false);

  // Simu étapes attribuées (à remplacer ensuite par fetch Supabase)
  const etapes = [
    {
      titre: "Accueil sur le site",
      description: "Présentation de l’environnement, badge, vestiaires.",
      duree: "15min",
      lien: "Règlement intérieur.pdf",
      quiz: null,
    },
    {
      titre: "Observation d’une tournée",
      description: "Suivi d’un opérateur expérimenté.",
      duree: "1h",
      lien: null,
      quiz: {
        question: "Que devez-vous vérifier avant chaque lancement de CSP ?",
        reponseUtilisateur: "",
      },
    },
    {
      titre: "Manipulation assistée",
      description: "Exercice de lancement guidé.",
      duree: "1h30",
      lien: "Procédure_Lancement.pdf",
      quiz: null,
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">🚦 Mon parcours : TOURNÉE CSP</h1>
      <ol className="border-l-4 border-blue-600 pl-6 space-y-6">
        {etapes.map((etape, index) => (
          <li key={index} className="relative">
            <div className="absolute -left-3 top-1 w-5 h-5 bg-blue-500 rounded-full"></div>
            <Card className="p-4">
              <h2 className="text-lg font-semibold">🧩 Étape {index + 1} : {etape.titre}</h2>
              <p className="text-sm text-gray-600">⏱️ Durée estimée : {etape.duree}</p>
              <p className="mt-2 text-sm text-gray-800">{etape.description}</p>
              {etape.lien && (
                <p className="mt-2 text-sm text-blue-600">📎 Document associé : {etape.lien}</p>
              )}
              {etape.quiz && (
                <div className="mt-4">
                  <p className="text-sm font-semibold">❓ Quiz : {etape.quiz.question}</p>
                  <Input
                    placeholder="Votre réponse"
                    value={etape.quiz.reponseUtilisateur}
                    onChange={(e) => {
                      etape.quiz.reponseUtilisateur = e.target.value;
                    }}
                  />
                </div>
              )}
              <Textarea placeholder="💬 Vos remarques / observations" className="mt-3" />
            </Card>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-3">
        <Checkbox id="sign" checked={signature} onCheckedChange={setSignature} />
        <label htmlFor="sign" className="text-sm">Je certifie avoir complété toutes les étapes du parcours</label>
      </div>

      <Button className="mt-4">📨 Envoyer au tuteur</Button>
    </div>
  );
};

export default ParcoursTimeline;
