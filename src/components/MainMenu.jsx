import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  GraduationCap,
  BookMarked,
  FileText,
  Users,
  Settings,
  Lightbulb,
  BadgeCheck,
  BarChart3,
  Menu,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MainMenu = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const items = [
    { to: "/dashboard", label: "Accueil", icon: Home },
    { to: "/audits", label: "Audits", icon: ClipboardList },
    { to: "/tutorat", label: "Tutorat", icon: GraduationCap },
    { to: "/tutore", label: "Mon Parcours", icon: GraduationCap }, // 👤 Vue tutoré
    { to: "/tuteur", label: "Suivi Tutorés", icon: Users },         // 🧑‍🏫 Vue tuteur
   
    { to: "/documents", label: "Documents", icon: FileText },
    { to: "/utilisateurs", label: "Utilisateurs", icon: Users },
    { to: "/panel", label: "Panel de contrôle", icon: Settings },
    { to: "/suggestions", label: "Suggestions", icon: Lightbulb },
    { to: "/habilitations", label: "Habilitations", icon: BadgeCheck },
    { to: "/suggestions-stats", label: "Stats Suggestions", icon: BarChart3 },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow flex items-center justify-between px-4 py-3">
      {/* Logo */}
      <Link to="/dashboard" className="text-xl font-bold text-blue-700">
        App Métier GT
      </Link>

      {/* Utilisateur + déconnexion + menu burger */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:inline">
        {user?.nom} — <span className="italic">{user?.poste}</span>
        </span>

        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
        >
          <LogOut size={16} /> Déconnexion
        </button>

        <button
          onClick={toggleMenu}
          className="bg-gray-900 hover:bg-gray-800 p-2 rounded-full shadow text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay noir semi-transparent */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Menu déroulant animé */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-gray-900 text-white rounded-xl shadow-lg p-4 space-y-2 animate-fade-down z-50 min-w-[220px]">
          <h2 className="font-semibold text-lg text-white mb-2">Navigation</h2>
          {items.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-gray-800 ${
                  isActive ? "bg-gray-800 text-blue-400" : ""
                }`}
              >
                <Icon size={18} /> <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainMenu;
