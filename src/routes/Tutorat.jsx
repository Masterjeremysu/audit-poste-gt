import React, { useEffect, useState } from 'react';

import { supabase } from '../supabase';

const Tutorat = () => {
  const [userRole, setUserRole] = useState('');
  const [tutorats, setTutorats] = useState([]);
  const [newTutorat, setNewTutorat] = useState({
    nom: '',
    poste: '',
    tuteur: '',
    date_debut: '',
    progression: 'En cours',
  });

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'Utilisateur');
    fetchTutorats();
  }, []);

  const fetchTutorats = async () => {
    const { data, error } = await supabase
      .from('tutorats')
      .select('*')
      .order('date_debut', { ascending: false });

    if (error) {
      console.error('Erreur chargement tutorats :', error.message);
    } else {
      setTutorats(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTutorat((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTutorat = async () => {
    const { nom, poste, tuteur, date_debut } = newTutorat;
    if (!nom || !poste || !tuteur || !date_debut) return;

    const { error } = await supabase.from('tutorats').insert([newTutorat]);

    if (error) {
      console.error('Erreur ajout tutorat :', error.message);
    } else {
      setNewTutorat({
        nom: '',
        poste: '',
        tuteur: '',
        date_debut: '',
        progression: 'En cours',
      });
      fetchTutorats(); // refresh list
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Suivi des Tutorats</h2>

        {/* Formulaire d’ajout */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Ajouter un tutorat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom du salarié"
              value={newTutorat.nom}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="poste"
              placeholder="Poste"
              value={newTutorat.poste}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="tuteur"
              placeholder="Tuteur"
              value={newTutorat.tuteur}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="date_debut"
              value={newTutorat.date_debut}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <select
              name="progression"
              value={newTutorat.progression}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option>En cours</option>
              <option>Terminé</option>
              <option>Abandonné</option>
            </select>
          </div>
          <button
            onClick={handleAddTutorat}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>

        {/* Tableau */}
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Poste</th>
              <th className="p-2 text-left">Tuteur</th>
              <th className="p-2 text-left">Début</th>
              <th className="p-2 text-left">Progression</th>
            </tr>
          </thead>
          <tbody>
            {tutorats.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.nom}</td>
                <td className="p-2">{t.poste}</td>
                <td className="p-2">{t.tuteur}</td>
                <td className="p-2">{t.date_debut}</td>
                <td className="p-2">{t.progression}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tutorat;
