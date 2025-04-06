// ✅ Fichier : src/routes/Audits.jsx — Refonte PRO du module d’audits internes

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Calendar, ClipboardList, Filter, FilePlus2, RotateCcw, Trash2 } from "lucide-react";

const Audits = () => {
  const [audits, setAudits] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [newAudit, setNewAudit] = useState({
    poste: "",
    auditeur: "",
    date: "",
    statut: "A faire",
  });

  const fetchAudits = async () => {
    const { data, error } = await supabase.from("audits").select("*").order("date", { ascending: false });
    if (!error) setAudits(data);
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAudit((prev) => ({ ...prev, [name]: value }));
  };

  const addAudit = async () => {
    const { poste, auditeur, date } = newAudit;
    if (!poste || !auditeur || !date) return alert("Champs requis manquants");
    const { error } = await supabase.from("audits").insert([newAudit]);
    if (!error) {
      setNewAudit({ poste: "", auditeur: "", date: "", statut: "A faire" });
      fetchAudits();
    }
  };

  const updateStatut = async (id, statut) => {
    await supabase.from("audits").update({ statut }).eq("id", id);
    fetchAudits();
  };

  const deleteAudit = async (id) => {
    if (confirm("Supprimer cet audit ?")) {
      await supabase.from("audits").delete().eq("id", id);
      fetchAudits();
    }
  };

  const filtres = ["Tous", "A faire", "En cours", "Fait"];
  const auditsFiltres = filter === "Tous" ? audits : audits.filter((a) => a.statut === filter);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <ClipboardList size={28} /> Suivi des audits de poste
      </h1>

      {/* Formulaire d’ajout */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-semibold">➕ Nouvel audit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="poste"
            placeholder="Poste audité"
            value={newAudit.poste}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="auditeur"
            placeholder="Nom de l'auditeur"
            value={newAudit.auditeur}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            name="date"
            value={newAudit.date}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={addAudit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FilePlus2 size={16} className="inline-block mr-2" /> Ajouter
          </button>
        </div>
      </div>

      {/* Filtres dynamiques */}
      <div className="flex gap-2 mb-4">
        {filtres.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition-all border hover:border-gray-400 ${
              filter === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <Filter size={14} /> {s}
          </button>
        ))}
      </div>

      {/* Tableau des audits */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {auditsFiltres.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded shadow border space-y-2">
            <h3 className="text-lg font-semibold text-blue-800">{a.poste}</h3>
            <p className="text-sm text-gray-700">Auditeur : {a.auditeur}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} /> {a.date}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  a.statut === "Fait" ? "bg-green-100 text-green-700" :
                  a.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-700"
                }`}
              >
                {a.statut}
              </span>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatut(a.id, "En cours")}
                className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
              >
                <RotateCcw size={14} className="inline-block mr-1" /> En cours
              </button>
              <button
                onClick={() => updateStatut(a.id, "Fait")}
                className="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
              >
                ✅ Fait
              </button>
              <button
                onClick={() => deleteAudit(a.id)}
                className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
              >
                <Trash2 size={14} className="inline-block mr-1" /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audits;
