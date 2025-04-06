// ✅ Fichier : src/routes/Habilitations.jsx — Refactor MAJ noms de colonnes Supabase

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { BadgeCheck, FilePlus, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const postesDisponibles = [
  "Opérateur", "Intérimaire", "Leader PDT", "Leader Planning", "Leader Silicium",
  "Adjoint PDT", "Responsable d'activités PDT", "Responsable d'activités Silicium", "Responsable site"
];

const statutsDisponibles = ["Valide", "En attente", "Expiré"];

const Habilitations = () => {
  const [loading, setLoading] = useState(true);
  const [habilitations, setHabilitations] = useState([]);
  const [newHabi, setNewHabi] = useState({
    nom: "",
    poste: "",
    habilitation: "",
    formation: "",
    date_habilitation: "",
    date_validite: "",
    statut: "",
    date_relance: ""
  });

  useEffect(() => {
    fetchHabilitations();
  }, []);

  const fetchHabilitations = async () => {
    const { data, error } = await supabase.from("habilitations").select("*").order("date_habilitation", { ascending: false });
    if (!error) setHabilitations(data);
    else toast.error("Erreur chargement données : " + error.message);
    setLoading(false);
  };

  const handleAdd = async () => {
    const payload = Object.fromEntries(
      Object.entries(newHabi).filter(([_, v]) => v && v.trim() !== "")
    );

    if (!payload.nom || !payload.formation || !payload.date_habilitation || !payload.date_relance) {
      return toast.error("Veuillez remplir tous les champs obligatoires.");
    }

    const { error } = await supabase.from("habilitations").insert([payload]);

    if (error) {
      console.error("Erreur Supabase:", error);
      toast.error("Erreur à l'envoi : " + error.message);
    } else {
      toast.success("✅ Habilitation ajoutée");
      setNewHabi({ nom: "", poste: "", habilitation: "", formation: "", date_habilitation: "", date_validite: "", statut: "", date_relance: "" });
      fetchHabilitations();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("habilitations").delete().eq("id", id);
    if (!error) {
      toast.success("Supprimée");
      setHabilitations((prev) => prev.filter((h) => h.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BadgeCheck size={28} /> Gestion des Habilitations
      </h1>

      {/* Ajout rapide */}
      <div className="mb-6 p-4 bg-white border rounded shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <FilePlus size={18} /> Ajouter une habilitation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Nom" value={newHabi.nom} onChange={(e) => setNewHabi({ ...newHabi, nom: e.target.value })} className="p-2 border rounded" />

          <select value={newHabi.poste} onChange={(e) => setNewHabi({ ...newHabi, poste: e.target.value })} className="p-2 border rounded">
            <option value="">Poste</option>
            {postesDisponibles.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <input type="text" placeholder="Habilitation" value={newHabi.habilitation} onChange={(e) => setNewHabi({ ...newHabi, habilitation: e.target.value })} className="p-2 border rounded" />
          <input type="text" placeholder="Formation" value={newHabi.formation} onChange={(e) => setNewHabi({ ...newHabi, formation: e.target.value })} className="p-2 border rounded" />

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">📅 Date d’habilitation</label>
            <input type="date" value={newHabi.date_habilitation} onChange={(e) => setNewHabi({ ...newHabi, date_habilitation: e.target.value })} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">📅 Date de validité</label>
            <input type="date" value={newHabi.date_validite} onChange={(e) => setNewHabi({ ...newHabi, date_validite: e.target.value })} className="p-2 border rounded" />
          </div>

          <select value={newHabi.statut} onChange={(e) => setNewHabi({ ...newHabi, statut: e.target.value })} className="p-2 border rounded">
            <option value="">Statut</option>
            {statutsDisponibles.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">🔁 Date de relance</label>
            <input type="date" value={newHabi.date_relance} onChange={(e) => setNewHabi({ ...newHabi, date_relance: e.target.value })} className="p-2 border rounded" />
          </div>
        </div>
        <button onClick={handleAdd} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ajouter
        </button>
      </div>

      {/* Liste des habilitations */}
      {loading ? (
        <div className="text-gray-600 flex items-center gap-2">
          <Loader2 className="animate-spin" /> Chargement...
        </div>
      ) : (
        <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">👤 Nom</th>
              <th className="p-3">📌 Poste</th>
              <th className="p-3">🧾 Habilitation</th>
              <th className="p-3">🎓 Formation</th>
              <th className="p-3">📅 Habilitation</th>
              <th className="p-3">🕒 Validité</th>
              <th className="p-3">📌 Statut</th>
              <th className="p-3">🔁 Relance</th>
              <th className="p-3">🛠️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {habilitations.map((h) => (
              <tr key={h.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{h.nom}</td>
                <td className="p-3">{h.poste}</td>
                <td className="p-3">{h.habilitation}</td>
                <td className="p-3">{h.formation}</td>
                <td className="p-3">{h.date_habilitation || "—"}</td>
                <td className="p-3">{h.date_validite || "—"}</td>
                <td className="p-3">{h.statut || "—"}</td>
                <td className="p-3">{h.date_relance || "—"}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(h.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Habilitations;
