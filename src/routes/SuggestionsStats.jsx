// ✅ Fichier : src/routes/SuggestionsStats.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#34d399", "#f87171", "#facc15"];

const SuggestionsStats = () => {
  const [stats, setStats] = useState([]);
  const [topContributeurs, setTopContributeurs] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: suggestions } = await supabase.from("suggestions").select("*");

    const parStatut = suggestions.reduce((acc, s) => {
      acc[s.statut] = (acc[s.statut] || 0) + 1;
      return acc;
    }, {});

    const parAuteur = suggestions.reduce((acc, s) => {
      acc[s.auteur] = (acc[s.auteur] || 0) + 1;
      return acc;
    }, {});

    const classement = Object.entries(parAuteur)
      .map(([auteur, total]) => ({ auteur, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setStats([
      { name: "Validée", value: parStatut["Validée"] || 0 },
      { name: "Refusée", value: parStatut["Refusée"] || 0 },
      { name: "En attente", value: parStatut["En attente"] || 0 },
    ]);

    setTopContributeurs(classement);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">📊 Statistiques des Suggestions</h1>

      {/* Graphe circulaire par statut */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Répartition par statut</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={stats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {stats.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top contributeurs */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">🏆 Top contributeurs</h2>
        <ul className="space-y-2 text-sm">
          {topContributeurs.map((t, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">{t.auteur}</span>
              — {t.total} idée(s)
              {i === 0 && <span className="ml-2 bg-yellow-400 px-2 py-0.5 rounded text-xs">🥇</span>}
              {i === 1 && <span className="ml-2 bg-gray-300 px-2 py-0.5 rounded text-xs">🥈</span>}
              {i === 2 && <span className="ml-2 bg-orange-300 px-2 py-0.5 rounded text-xs">🥉</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestionsStats;
