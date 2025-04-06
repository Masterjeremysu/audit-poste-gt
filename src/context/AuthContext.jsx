import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userId = session.user.id;
        const { data: profil, error } = await supabase
          .from("utilisateurs")
          .select("*")
          .eq("id", userId)
          .single();

        if (!error && profil) {
          setUser({
            id: userId,
            email: session.user.email,
            nom: profil.nom,
            poste: profil.poste,
            role: profil.role_app,
          });
          localStorage.setItem("userRole", profil.role_app);
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      if (event === "SIGNED_IN" && session) {
        getSession();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
