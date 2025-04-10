// ✅ Fichier : src/routes/Dashboard.jsx — version sécurisée sans erreur de chargement
import React, { useEffect, useState } from "react";
import RecentActivity from "@/components/RecentActivity";

import { supabase } from "../supabase";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
  Target,
} from "lucide-react";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      const [tutorats, habilitations, documents, suggestions, utilisateurs] =
        await Promise.all([
          supabase.from("tutorats").select("*"),
          supabase.from("habilitations").select("*"),
          supabase.from("documents").select("*"),
          supabase.from("suggestions").select("*"),
          supabase.from("utilisateurs").select("*"),
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

  const expiringHabilitations =
    stats.habilitations?.filter((h) => {
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

  const poleStats = [
    { nom: "PDT", parcours: 6, formés: 4 },
    { nom: "Silicium", parcours: 5, formés: 3 },
    { nom: "Planning", parcours: 3, formés: 2 },
  ];

  const evolutionData = [
    { mois: "Janv", tutorats: 2, suggestions: 4 },
    { mois: "Févr", tutorats: 3, suggestions: 5 },
    { mois: "Mars", tutorats: 4, suggestions: 6 },
    { mois: "Avr", tutorats: 5, suggestions: 2 },
    { mois: "Mai", tutorats: 6, suggestions: 3 },
  ];

  const objectifs = [
    {
      label: "100 utilisateurs formés",
      cible: 100,
      actuel: stats.utilisateurs?.length || 0,
    },
    {
      label: "20 parcours actifs",
      cible: 20,
      actuel: stats.tutorats?.length || 0,
    },
    {
      label: "80% de suggestions traitées",
      cible: 0.8,
      actuel:
        suggestionsStats.total > 0
          ? (suggestionsStats.valides + suggestionsStats.refusees) / suggestionsStats.total
          : 0,
    },
  ];

  if (loading) return <div className="p-6">Chargement du tableau de bord...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>

      <QuickActions />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Tutorats en cours" value={stats.tutorats?.length || 0} icon={<GraduationCap />} to="/tutorat" />
        <InfoCard title="Habilitations" value={stats.habilitations?.length || 0} icon={<CheckCircle />} to="/habilitations" />
        <InfoCard title="Documents" value={stats.documents?.length || 0} icon={<FileText />} to="/documents" />
        <InfoCard title="Suggestions" value={stats.suggestions?.length || 0} icon={<Lightbulb />} to="/suggestions" />
        <InfoCard title="Utilisateurs" value={stats.utilisateurs?.length || 0} icon={<Users />} to="/utilisateurs" />
        <InfoCard title="Audits" value={0} icon={<ClipboardList />} to="/audits" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <ActivityTimeline data={[]} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-2">Statuts des suggestions</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">Vue par pôle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {poleStats.map((pole, idx) => (
            <div key={idx} className="border border-gray-200 p-4 rounded-md">
              <p className="text-lg font-semibold">{pole.nom}</p>
              <p className="text-sm text-gray-500">Parcours créés : {pole.parcours}</p>
              <p className="text-sm text-gray-500">Formés : {pole.formés}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">📈 Évolution mensuelle</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tutorats" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="suggestions" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">🎯 Objectifs & complétion</h2>
        <div className="space-y-3">
          {objectifs.map((obj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="text-gray-500" size={16} />
                <p className="text-sm font-medium">{obj.label}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2"
                  style={{ width: `${Math.min((obj.actuel / obj.cible) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, to }) => (
  <Link to={to} className="bg-white shadow rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </Link>
);

export default Dashboard;
