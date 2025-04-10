// ✅ Fichier : src/components/documents/ConfirmDeleteDialog.jsx — Suppression avec sécurité (copie du nom requise)
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const ConfirmDeleteDialog = ({ doc, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleDelete = () => {
    onConfirm(doc);
    setOpen(false);
    setUserInput("");
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="text-red-600 hover:text-red-800 flex items-center gap-1"
      >
        <Trash2 size={16} /> Supprimer
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Suppression du document
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Vous êtes sur le point de supprimer le document suivant :
            <span className="block font-semibold mt-1">{doc.titre}</span>
            Cette action est irréversible. Pour confirmer, copiez le titre exact ci-dessous.
          </p>

          <Input
            placeholder="Recopier le titre ici"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="mb-4"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={userInput !== doc.titre}
            >
              Confirmer la suppression
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteDialog;