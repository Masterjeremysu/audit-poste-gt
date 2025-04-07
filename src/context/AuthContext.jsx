import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user;

      if (authUser) {
        // 🔍 On récupère les infos de la table "utilisateurs"
        const { data: profile, error } = await supabase
          .from("utilisateurs")
          .select("nom, poste, role_app")
          .eq("id", authUser.id)
          .single();

        if (error) {
          console.error("Erreur récupération utilisateur :", error.message);
          setUser({ ...authUser }); // fallback minimal
        } else {
          // ✅ fusion des données Auth + table
          setUser({
            ...authUser,
            nom: profile.nom,
            poste: profile.poste,
            role: profile.role_app,
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUser(); // rafraîchit à chaque changement d'état
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
