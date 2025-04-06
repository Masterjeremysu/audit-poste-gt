// ✅ Fichier : src/routes/Documents.jsx — Nouvelle version PRO avec features avancées

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FilePlus2, Download, Trash2, Loader2, FileSearch } from "lucide-react";
import { toast } from "react-hot-toast";

const categories = ["Procédures", "Formulaires", "Notes internes", "Fiches sécurité"];

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fichier, setFichier] = useState(null);
  const [categorie, setCategorie] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Erreur chargement : " + error.message);
    else setDocs(data);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!fichier || !categorie) return toast.error("Fichier et catégorie obligatoires");
    setUploading(true);

    const filename = `${Date.now()}_${fichier.name}`;
    const { error: uploadError } = await supabase.storage.from("docs").upload(filename, fichier);

    if (uploadError) {
      toast.error("Erreur upload : " + uploadError.message);
      setUploading(false);
      return;
    }

    const { error: insertError } = await supabase.from("documents").insert([
      { name: fichier.name, file_path: filename, category: categorie }
    ]);

    if (insertError) toast.error("Erreur enregistrement : " + insertError.message);
    else toast.success("Fichier ajouté ✅");

    setFichier(null);
    setCategorie("");
    fetchDocuments();
    setUploading(false);
  };

  const handleDelete = async (doc) => {
    const { error: storageError } = await supabase.storage.from("docs").remove([doc.file_path]);
    const { error: deleteError } = await supabase.from("documents").delete().eq("id", doc.id);

    if (storageError || deleteError) toast.error("Erreur suppression fichier");
    else {
      toast.success("Supprimé ✅");
      setDocs((prev) => prev.filter((d) => d.id !== doc.id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileSearch size={28} /> Documents internes
      </h1>

      {/* Ajout */}
      <div className="bg-white border rounded-xl p-4 shadow mb-6">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <FilePlus2 size={18} /> Ajouter un document
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input type="file" onChange={(e) => setFichier(e.target.files[0])} className="p-2 border rounded" />
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="p-2 border rounded">
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={handleUpload} disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {uploading ? "Envoi..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin" /> Chargement...
        </div>
      ) : (
        <table className="w-full text-sm bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">📁 Nom</th>
              <th className="p-3">📂 Catégorie</th>
              <th className="p-3">📅 Ajouté</th>
              <th className="p-3">🔗 Télécharger</th>
              <th className="p-3">🗑️</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{doc.name}</td>
                <td className="p-3">{doc.category}</td>
                <td className="p-3">{new Date(doc.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <a
                    href={`https://mmusqtxfdzznxuygimpv.supabase.co/storage/v1/object/public/docs/${doc.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Télécharger
                  </a>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(doc)} className="text-red-600 hover:text-red-800">
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

export default Documents;
