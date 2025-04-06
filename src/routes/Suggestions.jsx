// ✅ Fichier : src/routes/Suggestions.jsx — Version mise à jour avec vote sécurisé, bouton désactivé si déjà voté, et icône ✅

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { ThumbsUp, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Suggestions = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [votesEffectues, setVotesEffectues] = useState([]);
  const [statutFiltre, setStatutFiltre] = useState("Tous");
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    auteur: user?.nom || "",
  });
  const [commentaires, setCommentaires] = useState({});

  const fetchSuggestions = async () => {
    const { data } = await supabase
      .from("suggestions")
      .select("*, commentaires(*)")
      .order("votes", { ascending: false });

    setSuggestions(data || []);
    const com = {};
    data?.forEach((s) => (com[s.id] = ""));
    setCommentaires(com);
  };

  const fetchVotes = async () => {
    const { data } = await supabase
      .from("votes")
      .select("suggestion_id")
      .eq("user_id", user?.id);
    setVotesEffectues(data?.map((v) => v.suggestion_id) || []);
  };

  useEffect(() => {
    if (user?.id) {
      fetchSuggestions();
      fetchVotes();
    }
  }, [user]);

  const handleVote = async (id) => {
    if (!user?.id) return;
    if (votesEffectues.includes(id)) return;

    const { error } = await supabase.rpc("increment_vote", {
      suggestion_id_input: id,
      user_id_input: user.id,
    });

    if (!error) {
      fetchSuggestions();
      fetchVotes();
    } else {
      console.error("Erreur lors du vote :", error.message);
    }
  };

  const updateStatut = async (id, statut) => {
    await supabase.from("suggestions").update({ statut }).eq("id", id);
    fetchSuggestions();
  };

  const handleAdd = async () => {
    const { titre, description, auteur } = formData;
    if (!titre || !description || !auteur)
      return alert("Tous les champs sont requis");

    const { data: existing } = await supabase
      .from("suggestions")
      .select("id")
      .eq("titre", titre)
      .single();

    if (existing) {
      return alert("Une suggestion portant ce titre existe déjà !");
    }

    const { error } = await supabase.from("suggestions").insert([
      {
        titre,
        description,
        auteur,
        statut: "En attente",
        votes: 0,
        date: new Date().toISOString().split("T")[0],
      },
    ]);

    if (!error) {
      setFormData({ titre: "", description: "", auteur: user?.nom || "" });
      fetchSuggestions();
    } else {
      console.error("Erreur à l'ajout :", error.message);
      alert("Erreur à l'ajout : " + error.message);
    }
  };

  const addComment = async (suggestion_id) => {
    const text = commentaires[suggestion_id];
    if (!text) return;
    await supabase.from("commentaires").insert([
      {
        suggestion_id,
        auteur: user?.nom || "Anonyme",
        texte: text,
        date: new Date().toISOString(),
      },
    ]);
    fetchSuggestions();
  };

  const isManager =
    [
      "admin",
      "Responsable site",
      "Responsable d'activités PDT",
      "Responsable d'activités Silicium",
    ].includes(user?.role);

  const filtres = ["Tous", "En attente", "Validée", "Refusée"];

  const suggestionsFiltrees =
    statutFiltre === "Tous"
      ? suggestions
      : suggestions.filter((s) => s.statut === statutFiltre);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">💡 Suggestions</h1>

      {/* Ajout de suggestion */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        <h2 className="text-xl font-semibold">➕ Proposer une idée</h2>
        <input
          type="text"
          placeholder="Titre de la suggestion"
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
          className="border rounded px-3 py-2 w-full"
        />
        <textarea
          placeholder="Description détaillée"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Nom de l'auteur"
          value={formData.auteur}
          onChange={(e) =>
            setFormData({ ...formData, auteur: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter la suggestion
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4">
        {filtres.map((s) => (
          <button
            key={s}
            onClick={() => setStatutFiltre(s)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statutFiltre === s ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Liste des suggestions */}
      <div className="space-y-4">
        {suggestionsFiltrees.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{s.titre}</h2>
              <span
                className={`text-sm font-medium ${
                  s.statut === "Validée"
                    ? "text-green-600"
                    : s.statut === "Refusée"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {s.statut}
              </span>
            </div>
            <p className="text-gray-700">{s.description}</p>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              Proposé par <strong>{s.auteur}</strong> — le {s.date}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleVote(s.id)}
                disabled={votesEffectues.includes(s.id)}
                className={`flex items-center gap-1 text-sm px-3 py-1 rounded ${
                  votesEffectues.includes(s.id)
                    ? 'bg-green-100 text-green-600 cursor-not-allowed'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp size={16} />
                {votesEffectues.includes(s.id) && '✅'} {s.votes}
              </button>
              {isManager && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatut(s.id, "Validée")}
                    className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded hover:bg-green-200"
                  >
                    <CheckCircle size={16} className="inline-block mr-1" />
                    Valider
                  </button>
                  <button
                    onClick={() => updateStatut(s.id, "Refusée")}
                    className="bg-red-100 text-red-700 px-2 py-1 text-sm rounded hover:bg-red-200"
                  >
                    <XCircle size={16} className="inline-block mr-1" />
                    Refuser
                  </button>
                </div>
              )}
            </div>

            {/* Commentaires */}
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <MessageCircle size={16} /> Commentaires
              </h3>
              <ul className="text-sm space-y-1">
                {s.commentaires?.map((c, i) => (
                  <li key={i} className="border-b pb-1">
                    <strong>{c.auteur}</strong> : {c.texte}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Ajouter un commentaire..."
                  value={commentaires[s.id] || ""}
                  onChange={(e) =>
                    setCommentaires({ ...commentaires, [s.id]: e.target.value })
                  }
                  className="border rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => addComment(s.id)}
                  className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
