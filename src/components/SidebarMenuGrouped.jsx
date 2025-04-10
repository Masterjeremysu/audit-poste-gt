// ✅ SIDEBAR MENU GROUPE — Menu latéral avec sous-menus conditionnels
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronUp, Home, ClipboardList, GraduationCap,
  BookMarked, FileText, Users, Settings, Lightbulb, BadgeCheck, BarChart3, Building2, X, Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarMenuGrouped = ({ onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (group) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl sticky top-0 h-screen z-50">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="font-bold text-lg text-blue-400">App GT</span>
        <button onClick={onClose} className="text-white hover:text-red-400">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        <Link to="/dashboard" className={`block px-3 py-2 rounded hover:bg-gray-800 ${isActive('/dashboard') && 'bg-gray-800 text-blue-400'}`}>🏠 Accueil</Link>

        {/* Groupe Audits */}
        <button onClick={() => toggleGroup('audits')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800">
          <span>📋 Audits & Qualité</span>
          {openGroup === 'audits' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openGroup === 'audits' && (
          <div className="ml-4 space-y-1">
            <Link to="/audits" className="block hover:text-blue-400">✔️ Audits</Link>
            <Link to="/habilitations" className="block hover:text-blue-400">🎓 Habilitations</Link>
          </div>
        )}

        {/* Groupe Tutorat */}
        <button onClick={() => toggleGroup('tutorat')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800">
          <span>🎓 Tutorat</span>
          {openGroup === 'tutorat' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openGroup === 'tutorat' && (
          <div className="ml-4 space-y-1">
            {(user?.role_app === 'TUTORÉ' || user?.poste?.toLowerCase().includes('opérateur')) && (
              <Link to="/tutore" className="block hover:text-blue-400">📚 Mon Parcours</Link>
            )}
            {(user?.role_app === 'TUTEUR' || user?.poste?.toLowerCase().includes('responsable')) && (
              <Link to="/tuteur" className="block hover:text-blue-400">📋 Suivi Tutorés</Link>
            )}
            {(user?.role_app === 'ADMIN' || user?.poste?.includes('Responsable')) && (
              <Link to="/parcours-config" className="block hover:text-blue-400">⚙️ Config. Parcours</Link>
            )}
          </div>
        )}

        {/* Groupe Connaissances */}
        <button onClick={() => toggleGroup('docs')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800">
          <span>📚 Connaissances</span>
          {openGroup === 'docs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openGroup === 'docs' && (
          <div className="ml-4 space-y-1">
         
            <Link to="/documents" className="block hover:text-blue-400">📂 Documents</Link>
          </div>
        )}

        {/* Groupe Entreprise */}
        <button onClick={() => toggleGroup('entreprise')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800">
          <span>🏢 Entreprise</span>
          {openGroup === 'entreprise' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openGroup === 'entreprise' && (
          <div className="ml-4 space-y-1">
            <Link to="/suggestions" className="block hover:text-blue-400">💡 Suggestions</Link>
            <Link to="/suggestions-stats" className="block hover:text-blue-400">📊 Statistiques</Link>
            <Link to="/entreprise" className="block hover:text-blue-400">👥 Organigramme</Link>

          </div>
        )}

        {/* Admin */}
        {(user?.role_app === 'ADMIN' || user?.poste?.includes('Responsable')) && (
          <>
            <button onClick={() => toggleGroup('admin')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800">
              <span>🛠️ Administration</span>
              {openGroup === 'admin' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openGroup === 'admin' && (
              <div className="ml-4 space-y-1">
                <Link to="/utilisateurs" className="block hover:text-blue-400">👥 Utilisateurs</Link>
                <Link to="/panel" className="block hover:text-blue-400">⚙️ Panel de Contrôle</Link>
              </div>
            )}
          </>
        )}
      </nav>

      <footer className="p-4 border-t border-gray-700 text-xs text-gray-400">
        <div className="mb-1">{user?.nom} — {user?.poste}</div>
        <button onClick={logout} className="text-red-400 hover:text-red-200">🚪 Déconnexion</button>
      </footer>
    </aside>
  );
};

export default SidebarMenuGrouped;
