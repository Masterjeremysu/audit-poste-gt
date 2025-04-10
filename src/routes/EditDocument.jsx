// ✅ Fichier : src/routes/EditDocument.jsx — Page d'édition avancée avec upload, versioning auto, et suivi utilisateur
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const EditDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fichier, setFichier] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      console.log("ID reçu:", id);
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur fetch:", error.message);
        toast.error("Erreur : document introuvable");
        return;
      }

      setDoc(data);
      setLoading(false);
    };

    fetchDoc();
  }, [id]);

  const handleUpdate = async () => {
    if (!doc.titre || !doc.description || !doc.pole || !doc.type) {
      return toast.error("Tous les champs sont obligatoires");
    }

    let fileUrl = doc.lien;
    let newVersion = parseFloat(doc.version || "1.0") + 0.1;

    if (fichier) {
      const filename = `${Date.now()}_${fichier.name}`;
      const { error: uploadError } = await supabase.storage.from("docs").upload(filename, fichier);

      if (uploadError) {
        return toast.error("Upload échoué : " + uploadError.message);
      }

      fileUrl = `https://mmusqtxfdzznxuygimpv.supabase.co/storage/v1/object/public/docs/${filename}`;
    }

    const { error } = await supabase
      .from("documents")
      .update({
        titre: doc.titre,
        description: doc.description,
        pole: doc.pole,
        type: doc.type,
        lien: fileUrl,
        version: newVersion.toFixed(1),
        updated_at: new Date().toISOString(),
        updated_by: user?.email || "inconnu"
      })
      .eq("id", doc.id);

    if (error) {
      console.error(error);
      toast.error("Mise à jour échouée");
    } else {
      // ✅ Création d'une activité liée à la mise à jour
      await supabase.from("activites").insert({
        type: "modification",
        cible: "document",
        cible_id: doc.id,
        titre: doc.titre,
        auteur: user?.email || "inconnu",
        date: new Date().toISOString()
      });

      toast.success("Document mis à jour ✅");
      navigate("/documents");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Modifier le document</h1>

      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded font-medium inline-block ${
            parseFloat(doc.version) >= 2
              ? "bg-green-100 text-green-700"
              : parseFloat(doc.version) >= 1
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
          title={`Version actuelle : v${doc.version}`}
        >
          v{doc.version}
        </span>
        {doc.updated_by && doc.updated_at && (
          <p className="text-xs italic text-gray-500">
            (Modifié par {doc.updated_by} le {new Date(doc.updated_at).toLocaleDateString()})
          </p>
        )}
      </div>

      <Input
        value={doc.titre}
        onChange={(e) => setDoc({ ...doc, titre: e.target.value })}
        placeholder="Titre"
      />
      <Input
        value={doc.description}
        onChange={(e) => setDoc({ ...doc, description: e.target.value })}
        placeholder="Description"
      />
      <select
        value={doc.pole}
        onChange={(e) => setDoc({ ...doc, pole: e.target.value })}
        className="border p-2 rounded w-full"
      >
        <option value="">Choisir un pôle</option>
        <option value="PDT">PDT</option>
        <option value="Silicium">Silicium</option>
        <option value="Planning">Planning</option>
        <option value="Qualité">Qualité</option>
      </select>
      <select
        value={doc.type}
        onChange={(e) => setDoc({ ...doc, type: e.target.value })}
        className="border p-2 rounded w-full"
      >
        <option value="">Choisir un type</option>
        <option value="Procédure">Procédure</option>
        <option value="Formulaire">Formulaire</option>
        <option value="Note interne">Note interne</option>
        <option value="Fiche sécurité">Fiche sécurité</option>
      </select>

      <input type="file" onChange={(e) => setFichier(e.target.files[0])} />

      <Button onClick={handleUpdate}>Mettre à jour le document</Button>
    </div>
  );
};

export default EditDocument;
