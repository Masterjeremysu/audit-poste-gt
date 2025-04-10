// ✅ Parcours Tutoré — Vue Simulation Apprenant Ajoutée
// Intègre : mode simulation visuel avec étapes, feedback, quiz et validation finale

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Checkbox from "@/components/ui/Checkbox"; // ✅ On garde uniquement celui-ci

const tuteurs = ['Guillaume', 'Dramane', 'Gregory', 'Jérémy', 'Nicolas'];

const ParcoursTutoratFeatures = () => {
  const [parcours, setParcours] = useState([]);
  const [etapes, setEtapes] = useState([]);
  const [simulation, setSimulation] = useState(false);
  const [signature, setSignature] = useState(false);
  const fileInputRef = useRef(null);

  const ajouterEtape = () => {
    setEtapes([
      ...etapes,
      {
        titre: '',
        description: '',
        duree: '',
        obligatoire: false,
        date: '',
        tuteur: '',
        feedback: '',
        lien: '',
        ressource: null,
        version: 1,
        quiz: { question: '', reponse: '', reponseUtilisateur: '' },
      },
    ]);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = JSON.parse(evt.target.result);
      setEtapes(data);
    };
    reader.readAsText(file);
  };

  const handleChange = (index, field, value) => {
    const updated = [...etapes];
    updated[index][field] = value;
    setEtapes(updated);
  };

  const calculerCharge = (texte) => {
    const longueur = texte.split(' ').length;
    if (longueur < 20) return '⚪ Faible';
    if (longueur < 50) return '🟡 Moyenne';
    return '🔴 Élevée';
  };

  const handleRessource = (index, file) => {
    const updated = [...etapes];
    updated[index].ressource = file;
    updated[index].version = updated[index].version + 1;
    setEtapes(updated);
  };

  if (simulation) {
    const totalDuree = etapes.reduce((a, b) => a + (parseInt(b.duree) || 0), 0);
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">👨‍🏫 Simulation du parcours</h1>
        <p className="text-sm text-muted-foreground">
          {etapes.length} étapes • Durée estimée : {totalDuree} min
        </p>
        <ol className="space-y-6 border-l-4 border-blue-600 pl-6">
          {etapes.map((etape, i) => (
            <li key={i} className="relative">
              <div className="absolute -left-3 top-1 w-5 h-5 bg-blue-500 rounded-full"></div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">{etape.titre}</h2>
                <p className="italic text-sm">⏱️ {etape.duree} min — 👤 Tuteur : {etape.tuteur}</p>
                <p>{etape.description}</p>
                {etape.lien && <p className="text-sm text-blue-600">🔗 {etape.lien}</p>}
                {etape.quiz.question && (
                  <div className="mt-2">
                    <Label>{etape.quiz.question}</Label>
                    <Input placeholder="Votre réponse..." value={etape.quiz.reponseUtilisateur} onChange={(e) => {
                      const updated = [...etapes];
                      updated[i].quiz.reponseUtilisateur = e.target.value;
                      setEtapes(updated);
                    }} />
                  </div>
                )}
                <Textarea
                  placeholder="💬 Votre feedback sur cette étape"
                  value={etape.feedback}
                  onChange={(e) => {
                    const updated = [...etapes];
                    updated[i].feedback = e.target.value;
                    setEtapes(updated);
                  }}
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-2">
          <Checkbox id="certify" checked={signature} onCheckedChange={setSignature} />
          <Label htmlFor="certify">Je certifie avoir complété ce parcours</Label>
        </div>

        <Button variant="outline" className="mt-4" onClick={() => setSimulation(false)}>↩️ Quitter la simulation</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Parcours Tutoré – Modules Avancés</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => fileInputRef.current.click()}><Upload className="w-4 h-4 mr-2" />Importer JSON</Button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <Button onClick={() => setSimulation(true)}>🎞️ Lancer Simulation</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {etapes.map((etape, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Input placeholder="Titre de l'étape" value={etape.titre} onChange={e => handleChange(i, 'titre', e.target.value)} />
            <Textarea placeholder="Description" value={etape.description} onChange={e => handleChange(i, 'description', e.target.value)} />
            <p className="text-sm">⭐ Charge cognitive : {calculerCharge(etape.description)}</p>
            <Input placeholder="Durée estimée (min)" value={etape.duree} onChange={e => handleChange(i, 'duree', e.target.value)} />
            <Label>Date d'échéance</Label>
            <Input type="date" value={etape.date} onChange={e => handleChange(i, 'date', e.target.value)} />
            <Label>Tuteur</Label>
            <select value={etape.tuteur} onChange={e => handleChange(i, 'tuteur', e.target.value)} className="w-full p-2 rounded border">
              <option value="">-- Choisir un tuteur --</option>
              {tuteurs.map((t, k) => <option key={k}>{t}</option>)}
            </select>
            <Input placeholder="Lien ressource externe" value={etape.lien} onChange={e => handleChange(i, 'lien', e.target.value)} />
            <Label>Fichier ressource</Label>
            <Input type="file" onChange={e => handleRessource(i, e.target.files[0])} />
            {etape.ressource && <p className="text-sm">📎 {etape.ressource.name} (v{etape.version})</p>}
            <div className="flex items-center gap-2">
              <Checkbox checked={etape.obligatoire} onCheckedChange={val => handleChange(i, 'obligatoire', val)} id={`ob-${i}`} />
              <Label htmlFor={`ob-${i}`}>{etape.obligatoire ? 'Obligatoire' : 'Optionnelle'}</Label>
            </div>
            <Label>❓ Quiz associé</Label>
            <Input placeholder="Question" value={etape.quiz.question} onChange={e => {
              const updated = [...etapes];
              updated[i].quiz.question = e.target.value;
              setEtapes(updated);
            }} />
            <Input placeholder="Réponse attendue" value={etape.quiz.reponse} onChange={e => {
              const updated = [...etapes];
              updated[i].quiz.reponse = e.target.value;
              setEtapes(updated);
            }} />
          </Card>
        ))}
      </div>

      <Button onClick={ajouterEtape}>➕ Ajouter une étape</Button>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">📊 Résumé parcours</h2>
        <p>Nombre d’étapes : {etapes.length}</p>
        <p>Durée totale estimée : {etapes.reduce((a, b) => a + (parseInt(b.duree) || 0), 0)} minutes</p>
        <p>Étapes obligatoires : {etapes.filter(e => e.obligatoire).length}</p>
        <p>Ressources jointes : {etapes.filter(e => e.ressource).length}</p>
        <p>Quiz inclus : {etapes.filter(e => e.quiz.question).length}</p>
      </div>
    </div>
  );
};

export default ParcoursTutoratFeatures;
