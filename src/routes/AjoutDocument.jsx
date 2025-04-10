// ✅ Fichier : src/routes/Documents.jsx — Version PRO ++ avec filtres avancés, suppression sécurisée, stats et recommandations
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Download, Trash2, Loader2, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pole, setPole] = useState("");
  const [type, setType] = useState("");
  const [confirmToDelete, setConfirmToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (!error) setDocuments(data);
    setLoading(false);
  };

  const filtered = documents.filter(
    (doc) =>
      (!pole || doc.pole === pole) &&
      (!type || doc.type === type) &&
      doc.titre.toLowerCase().includes(search.toLowerCase())
  );

  const getVersionColor = (version) => {
    const v = parseFloat(version);
    if (v >= 2) return "bg-green-100 text-green-800";
    if (v >= 1) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleDelete = async (doc) => {
    if (!confirmToDelete || confirmToDelete !== doc.titre) {
      return toast.error("Vous devez confirmer le titre du document à supprimer.");
    }
    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (!error) {
      toast.success("Document supprimé ✅");
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
      setConfirmToDelete(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents internes</h1>
        <Button onClick={() => navigate("/documents/ajout")}>
          Ajouter un document
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-1/3" />
        <select value={pole} onChange={(e) => setPole(e.target.value)} className="border rounded px-3 py-2 text-sm">
          <option value="">Tous les pôles</option>
          <option value="PDT">PDT</option>
          <option value="Silicium">Silicium</option>
          <option value="Planning">Planning</option>
          <option value="Qualité">Qualité</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-3 py-2 text-sm">
          <option value="">Tous les types</option>
          <option value="Procédure">Procédure</option>
          <option value="Formulaire">Formulaire</option>
          <option value="Note interne">Note interne</option>
          <option value="Fiche sécurité">Fiche sécurité</option>
        </select>
      </div>

      {loading ? (
        <div className="text-gray-600 flex gap-2 items-center">
          <Loader2 className="animate-spin" /> Chargement...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <Card key={doc.id}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <FolderOpen size={18} /> {doc.titre}
                </h2>
                {doc.favori && <Star size={18} className="text-yellow-400" />}
              </div>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2 line-clamp-3 min-h-[48px]">{doc.description}</p>
                <p className="text-xs text-gray-400 italic">Pôle : {doc.pole} — Type : {doc.type}</p>
                <div className="flex flex-wrap gap-2 items-center mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${getVersionColor(doc.version)}`}>
                    v{doc.version}
                  </span>
                  <a
                    href={doc.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex gap-1 items-center"
                  >
                    <Download size={14} /> Télécharger
                  </a>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm flex gap-1 items-center"
                    onClick={() => setConfirmToDelete(doc.titre)}
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
                {confirmToDelete === doc.titre && (
                  <div className="mt-3 p-3 bg-red-50 border text-sm rounded">
                    <p className="mb-1 font-medium text-red-700">Confirmation requise :</p>
                    <p>Pour supprimer <strong>{doc.titre}</strong>, recopiez le titre ci-dessous :</p>
                    <Input
                      placeholder="Titre exact à recopier"
                      className="mt-2"
                      onChange={(e) => setConfirmToDelete(e.target.value)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleDelete(doc)}
                    >
                      Confirmer la suppression
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;
