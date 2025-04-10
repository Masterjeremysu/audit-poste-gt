// ✅ SIDEBAR MENU — version moderne avec sous-menus et rôles dynamiques
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronUp, GraduationCap, Users, Settings, Home, Menu, LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarMenu = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl sticky top-0">
      <div className="p-4 font-bold text-xl text-center border-b border-gray-700">App GT</div>

      <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
        <Link
          to="/dashboard"
          className={`block px-3 py-2 rounded hover:bg-gray-800 ${isActive('/dashboard') && 'bg-gray-800 text-blue-400'}`}
        >🏠 Accueil</Link>

        {/* Groupe TUTORAT */}
        <button
          onClick={() => toggleSection('tutorat')}
          className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800"
        >
          <span>🎓 Tutorat</span>
          {openSection === 'tutorat' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === 'tutorat' && (
          <div className="ml-4 mt-1 space-y-1">
            {(user?.role_app === 'TUTORÉ' || user?.poste?.toLowerCase().includes('opérateur')) && (
              <Link
                to="/tutore"
                className={`block px-3 py-1 text-sm rounded hover:text-blue-400 ${isActive('/tutore') && 'text-blue-400'}`}
              >📚 Mon Parcours</Link>
            )}

            {(user?.role_app === 'TUTEUR' || user?.poste?.toLowerCase().includes('responsable')) && (
              <Link
                to="/tuteur"
                className={`block px-3 py-1 text-sm rounded hover:text-blue-400 ${isActive('/tuteur') && 'text-blue-400'}`}
              >📋 Suivi Tutorés</Link>
            )}

            {(user?.role_app === 'ADMIN' || user?.poste?.includes('Responsable')) && (
              <Link
                to="/parcours-config"
                className={`block px-3 py-1 text-sm rounded hover:text-blue-400 ${isActive('/parcours-config') && 'text-blue-400'}`}
              >⚙️ Config. parcours</Link>
            )}
          </div>
        )}

        {/* Autres modules */}
        <Link
          to="/panel"
          className={`block px-3 py-2 rounded hover:bg-gray-800 ${isActive('/panel') && 'bg-gray-800 text-blue-400'}`}
        >⚙️ Panel</Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm flex flex-col gap-1">
        <span className="text-gray-400">{user?.nom} — {user?.poste}</span>
        <button
          onClick={logout}
          className="text-red-400 hover:text-red-200 flex items-center gap-1"
        >
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
