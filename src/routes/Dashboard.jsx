// ✅ Fichier : src/routes/Dashboard.jsx — Base intelligente avec cartes, alertes et stats dynamiques

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  GraduationCap,
  FileText,
  Users,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      const [tutorats, habilitations, documents, suggestions, utilisateurs] = await Promise.all([
        supabase.from("tutorats").select("*"),
        supabase.from("habilitations").select("*"),
        supabase.from("documents").select("*"),
        supabase.from("suggestions").select("*"),
        supabase.from("utilisateurs").select("*")
      ]);

      setStats({
        tutorats: tutorats.data || [],
        habilitations: habilitations.data || [],
        documents: documents.data || [],
        suggestions: suggestions.data || [],
        utilisateurs: utilisateurs.data || [],
      });
      setLoading(false);
    };
    fetchAllStats();
  }, []);

  const expiringHabilitations = stats.habilitations?.filter((h) => {
    const relance = new Date(h.date_relance);
    return relance <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }) || [];

  const suggestionsStats = {
    total: stats.suggestions?.length || 0,
    valides: stats.suggestions?.filter((s) => s.statut === "Validée").length || 0,
    refusees: stats.suggestions?.filter((s) => s.statut === "Refusée").length || 0,
    attente: stats.suggestions?.filter((s) => s.statut === "En attente").length || 0,
  };

  const pieData = [
    { name: "Validée", value: suggestionsStats.valides },
    { name: "Refusée", value: suggestionsStats.refusees },
    { name: "En attente", value: suggestionsStats.attente },
  ];
  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  if (loading) return <div className="p-6">Chargement du tableau de bord...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>

      {/* 🔔 Alertes */}
      <div className="space-y-2">
        {expiringHabilitations.length > 0 && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2">
            <AlertTriangle size={18} /> {expiringHabilitations.length} habilitations arrivent à expiration dans les 30 jours !
          </div>
        )}
        {suggestionsStats.attente > 0 && (
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded flex items-center gap-2">
            <Lightbulb size={18} /> {suggestionsStats.attente} suggestion(s) en attente de validation.
          </div>
        )}
      </div>

      {/* 🧊 Cartes stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Tutorats en cours" value={stats.tutorats.length} icon={<GraduationCap />} to="/tutorat" />
        <InfoCard title="Habilitations" value={stats.habilitations.length} icon={<CheckCircle />} to="/habilitations" />
        <InfoCard title="Documents" value={stats.documents.length} icon={<FileText />} to="/documents" />
        <InfoCard title="Suggestions" value={stats.suggestions.length} icon={<Lightbulb />} to="/suggestions" />
        <InfoCard title="Utilisateurs" value={stats.utilisateurs.length} icon={<Users />} to="/utilisateurs" />
        <InfoCard title="Audits" value={0} icon={<ClipboardList />} to="/audits" />
      </div>

      {/* 📊 Graphe suggestions */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-2">Statuts des suggestions</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, to }) => (
  <Link
    to={to}
    className="bg-white shadow rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition"
  >
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </Link>
);

export default Dashboard;
