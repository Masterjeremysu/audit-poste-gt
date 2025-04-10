// ✅ AuthContext.jsx — version simple, fiable avec 1 seul loadUser
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user;

      if (authUser) {
        const { data: profile, error } = await supabase
          .from("utilisateurs")
          .select("nom, poste, role_app")
          .eq("id", authUser.id)
          .single();

        if (error) {
          setUser({ ...authUser });
        } else {
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
        loadUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    setUser(null);
    window.location.href = "/login"; // ✅ redirection manuelle propre
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
