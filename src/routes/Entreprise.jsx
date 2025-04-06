import React, { useEffect, useState } from 'react';


const Entreprise = () => {
  const [userRole, setUserRole] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'Utilisateur');

    // Suggestions fictives pour le moment
    const data = [
      { id: 1, auteur: 'T. Morel', contenu: 'Organiser un atelier sécurité une fois par mois.' },
      { id: 2, auteur: 'L. Gauthier', contenu: 'Mettre à disposition les nouveaux EPI dans le vestiaire 2.' },
    ];
    setSuggestions(data);
  }, []);

  const handleAddSuggestion = () => {
    if (newSuggestion.trim() === '') return;
    const newEntry = {
      id: suggestions.length + 1,
      auteur: 'Moi',
      contenu: newSuggestion,
    };
    setSuggestions([...suggestions, newEntry]);
    setNewSuggestion('');
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Vie en Entreprise</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Suggestions internes</h3>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Écrire une suggestion"
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              className="p-2 border rounded-l w-full"
            />
            <button
              onClick={handleAddSuggestion}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            >
              Envoyer
            </button>
          </div>

          <ul className="space-y-2">
            {suggestions.map((sugg) => (
              <li key={sugg.id} className="bg-white p-3 shadow rounded">
                <strong>{sugg.auteur}</strong> : {sugg.contenu}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">À venir</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Suivi des formations internes</li>
            <li>Tableau des habilitations par poste</li>
            <li>Ajout de documents PDF (fiche accueil, livret sécurité...)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Entreprise;
