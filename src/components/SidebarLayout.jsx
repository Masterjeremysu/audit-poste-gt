// ✅ LAYOUT GLOBAL AVEC SIDEBAR MODERNE + TOGGLE BURGER
import React, { useState } from 'react';
import SidebarMenuGrouped from './SidebarMenuGrouped';
import { Menu } from 'lucide-react';

const SidebarLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {open && <SidebarMenuGrouped onClose={() => setOpen(false)} />}

      {/* Zone principale */}
      <div className="flex-1">
        {/* Header avec burger */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          {!open && (
            <button onClick={() => setOpen(true)} className="text-gray-700">
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-800">App Métier GT</h1>
        </header>

        <main className="p-6 bg-slate-50 min-h-[90vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
