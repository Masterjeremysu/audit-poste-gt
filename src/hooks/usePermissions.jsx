// ✅ Fichier : src/hooks/usePermissions.jsx (version PRO avec gestion fluide, logs, fallback, loading state)

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

export const usePermissions = () => {
  const { user } = useAuth();
  const [modulesAutorises, setModulesAutorises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user?.role) {
        console.warn("⚠️ Aucun rôle détecté côté user");
        setModulesAutorises([]);
        setLoading(false);
        return;
      }

      const role = user.role.toLowerCase();
      console.log("🔐 Rôle utilisé pour la requête Supabase :", role);

      const { data, error } = await supabase
        .from('permissions')
        .select('module')
        .eq('role_app', role)
        .eq('visible', true);

      if (error) {
        console.error("❌ Erreur Supabase permissions:", error.message);
        setError(error.message);
      } else {
        console.log("✅ Modules autorisés récupérés:", data);
        const nomsModules = data.map((item) => item.module);
        setModulesAutorises(nomsModules);
      }
      setLoading(false);
    };

    fetchPermissions();
  }, [user]);

  return { modulesAutorises, loading, error };
};
