// ✅ Fichier : src/routes/GestionUtilisateurs.jsx (corrigé pour accès admin)

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const GestionUtilisateurs = () => {
  const { user } = useAuth();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const rolesDisponibles = [
    'utilisateur', 'admin', 'Responsable site', 'Responsable d\'activités PDT',
    'Adjoint PDT', 'Leader PDT', 'Responsable d\'activités Silicium',
    'Leader Planning', 'Leader Silicium', 'Opérateur'
  ];

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      const { data } = await supabase.from('utilisateurs').select('*');
      setUtilisateurs(data || []);
    };
    fetchUtilisateurs();
  }, []);

  const handleUpdate = async (id, field, value) => {
    const { error } = await supabase
      .from('utilisateurs')
      .update({ [field]: value })
      .eq('id', id);

    if (!error) {
      setUtilisateurs(prev =>
        prev.map(u => (u.id === id ? { ...u, [field]: value } : u))
      );
      setMessage(`✅ ${field} mis à jour`);
      setTimeout(() => setMessage(''), 2500);
    }
  };

  const handlePasswordReset = async (email) => {
    await supabase.auth.resetPasswordForEmail(email);
    setMessage(`🔐 Mail de réinitialisation envoyé à ${email}`);
    setTimeout(() => setMessage(''), 2500);
  };

  const filteredUsers = utilisateurs.filter(u =>
    u.nom?.toLowerCase().includes(search.toLowerCase()) ||
    u.poste?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Vérification insensible à la casse
  if (!['admin', 'responsable site'].includes(user?.role?.toLowerCase())) {
    return <div className="p-6 text-red-600">⛔ Accès refusé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      {message && (
        <div className="mb-4 bg-green-100 text-green-700 p-2 rounded">{message}</div>
      )}

      <input
        type="text"
        placeholder="🔍 Rechercher par nom ou poste"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Poste</th>
              <th className="p-2">Rôle</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.nom}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <input
                    value={u.poste || ''}
                    onChange={(e) =>
                      setUtilisateurs(prev =>
                        prev.map(x => x.id === u.id ? { ...x, poste: e.target.value } : x)
                      )
                    }
                    onBlur={(e) => handleUpdate(u.id, 'poste', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={u.role_app || ''}
                    onChange={(e) => handleUpdate(u.id, 'role_app', e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {rolesDisponibles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  {u.actif ? (
                    <button
                      onClick={() => handleUpdate(u.id, 'actif', false)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      ✅ Actif
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdate(u.id, 'actif', true)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      ❌ Inactif
                    </button>
                  )}
                </td>
                <td className="p-2">
                  {['admin'].includes(user?.role?.toLowerCase()) && (
                    <button
                      onClick={() => handlePasswordReset(u.email)}
                      className="text-blue-600 hover:underline"
                    >
                      🔐 Réinit. mot de passe
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUtilisateurs;
