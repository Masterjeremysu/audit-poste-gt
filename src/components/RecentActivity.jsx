// ✅ Fichier : src/components/RecentActivity.jsx — Affiche les activités liées aux documents
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FileText, Pencil, Clock } from "lucide-react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from("activites")
        .select("*")
        .eq("cible", "document")
        .order("date", { ascending: false })
        .limit(10);

      if (!error) setActivities(data);
    };

    fetchActivity();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock size={20} /> Activités récentes sur les documents
      </h2>
      <ul className="space-y-3">
        {activities.map((act) => (
          <li key={act.id} className="flex justify-between items-start border-b pb-2">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center text-sm font-medium">
                <FileText size={16} />
                <span>{act.titre}</span>
              </div>
              <p className="text-xs text-gray-500">
                {act.auteur || "Inconnu"} — {act.type} — {new Date(act.date).toLocaleString()}
              </p>
            </div>
            <a
              href={`/documents/edit/${act.cible_id}`}
              className="text-blue-600 hover:underline text-xs"
            >
              Modifier
            </a>
          </li>
        ))}
        {activities.length === 0 && (
          <p className="text-sm text-gray-500 italic">Aucune activité récente.</p>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
