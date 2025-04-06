// ✅ Fichier : src/routes/PanelControle.jsx (COMPLET avec toutes fonctionnalités)

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Settings, PlusCircle, Trash2, Download, Info, HelpCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const CATEGORIES = {
  audits: "QHSE",
  tutorat: "RH",
  wiki: "Support",
  documents: "Support",
  entreprise: "RH",
  suggestions: "RH",
  permissions: "Admin",
  utilisateurs: "Admin",
  panel: "Admin",
  habilitations: "RH",
  outils: "Support",
  statistiques: "Production",
  plannings: "Production",
  alertes: "QHSE",
  inventaire: "Production",
  suivi_formations: "RH",
  messages_internes: "Support",
};

const PanelControle = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPerm, setNewPerm] = useState({ role_app: "", module: "", visible: true });
  const [filterModule, setFilterModule] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [showDoc, setShowDoc] = useState(false);

  const rolesAutorises = [
    "admin",
    "responsable site",
    "responsable d'activités silicium",
    "responsable d'activités pdt",
    "adjoint pdt"
  ];

  const isAutorise = rolesAutorises.includes(user?.role?.toLowerCase());

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const { data, error } = await supabase.from("permissions").select("*");
    if (!error) setPermissions(data);
    setLoading(false);
  };

  const logHistorique = (action, role, module) => {
    const now = new Date().toLocaleString();
    setHistorique((prev) => [
      { action, role, module, date: now },
      ...prev.slice(0, 9)
    ]);
  };

  const togglePermission = async (role, module, current) => {
    const { error } = await supabase
      .from("permissions")
      .update({ visible: !current })
      .match({ role_app: role, module });

    if (!error) {
      setPermissions((prev) =>
        prev.map((p) =>
          p.role_app === role && p.module === module
            ? { ...p, visible: !current }
            : p
        )
      );
      logHistorique("Toggle", role, module);
      toast.success(`Permission mise à jour pour ${role}`);
    } else {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleAddPermission = async () => {
    const { role_app, module, visible } = newPerm;
    if (!role_app || !module) {
      toast.error("Champs requis manquants");
      return;
    }
    const existe = permissions.find(p => p.role_app === role_app && p.module === module);
    if (existe) {
      toast.error("Déjà existant");
      return;
    }

    const { data, error } = await supabase.from("permissions").insert([{ role_app, module, visible }]);
    if (!error && data) {
      setPermissions((prev) => [...prev, ...data]);
      setNewPerm({ role_app: "", module: "", visible: true });
      logHistorique("Ajout", role_app, module);
      toast.success("Permission ajoutée");
    } else {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleDeletePermission = async (role, module) => {
    const { error } = await supabase.from("permissions").delete().match({ role_app: role, module });
    if (!error) {
      setPermissions((prev) => prev.filter((p) => !(p.role_app === role && p.module === module)));
      logHistorique("Suppression", role, module);
      toast.success("Permission supprimée");
    } else {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleExport = () => {
    const csv = ["role_app,module,visible"].concat(
      permissions.map((p) => `${p.role_app},${p.module},${p.visible}`)
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "permissions_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAutorise) return <div className="p-6 text-red-600">⛔ Accès restreint</div>;
  if (loading) return <div className="p-6">Chargement des permissions...</div>;

  const filtered = permissions.filter(p =>
    (!filterModule || p.module.includes(filterModule)) &&
    (!filterRole || p.role_app.includes(filterRole))
  );

  const modules = [...new Set(filtered.map((p) => p.module))].sort();
  const roles = [...new Set(filtered.map((p) => p.role_app))].sort();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Settings size={28} /> Panel de contrôle – Accès aux modules
        <button onClick={() => setShowDoc(!showDoc)} className="ml-4 text-blue-600 hover:underline text-sm flex items-center gap-1">
          <HelpCircle size={18} /> Aide / Wiki
        </button>
      </h1>

      {showDoc && (
        <div className="mb-6 p-4 border rounded bg-blue-50 text-sm text-blue-800">
          ℹ️ Utilisez ce panneau pour gérer dynamiquement les accès aux modules selon les rôles. <br />
          Vous pouvez filtrer, ajouter, exporter ou supprimer des droits. Tous les changements sont suivis dans l'historique.
        </div>
      )}

      {/* Filtres et export */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Filtrer par module"
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filtrer par rôle"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Ajout de permission */}
      <div className="mt-4 mb-6 p-4 bg-white shadow border rounded-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <PlusCircle size={20} /> Ajouter une permission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              list="roles"
              placeholder="Rôle (ex: operateur)"
              value={newPerm.role_app}
              onChange={(e) => setNewPerm({ ...newPerm, role_app: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <datalist id="roles">
              {roles.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>
          <div>
            <input
              type="text"
              list="modules"
              placeholder="Module (ex: tutorat)"
              value={newPerm.module}
              onChange={(e) => setNewPerm({ ...newPerm, module: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <datalist id="modules">
              {modules.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>
          <div>
            <button
              onClick={handleAddPermission}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Affichage par carte */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module) => {
          const category = CATEGORIES[module] || "Autre";
          const colorClass = {
            RH: "bg-purple-50 border-purple-300",
            QHSE: "bg-yellow-50 border-yellow-300",
            Production: "bg-blue-50 border-blue-300",
            Admin: "bg-red-50 border-red-300",
            Support: "bg-gray-50 border-gray-300",
            Autre: "bg-white border-gray-200"
          }[category];

          return (
            <div key={module} className={`rounded-lg shadow p-4 border ${colorClass}`}>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
                {module} <span className="text-xs text-gray-500">({category})</span>
                <Info size={16} title="Basculer visibilité ou supprimer pour chaque rôle" />
              </h2>
              <div className="space-y-2">
                {roles.map((role) => {
                  const perm = permissions.find((p) => p.module === module && p.role_app === role);
                  const isVisible = perm?.visible ?? false;

                  return (
                    <div key={role + module} className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${isVisible ? "text-green-700" : "text-gray-400"}`}>{role}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => togglePermission(role, module, isVisible)}
                          className={`px-3 py-1 rounded text-sm flex items-center gap-1 transition ${
                            isVisible
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                          {isVisible ? "Visible" : "Masqué"}
                        </button>
                        <button
                          onClick={() => handleDeletePermission(role, module)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 px-2 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historique */}
      <div className="mt-10 bg-white p-4 rounded shadow border">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          🔁 Historique des 10 dernières actions
        </h3>
        <ul className="text-sm list-disc list-inside text-gray-600">
          {historique.map((entry, index) => (
            <li key={index}>
              [{entry.date}] {entry.action} — <strong>{entry.role}</strong> sur <em>{entry.module}</em>
            </li>
          ))}
          {historique.length === 0 && <li>Aucune action récente</li>}
        </ul>
      </div>
    </div>
  );
};

export default PanelControle;
