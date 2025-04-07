import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { supabase } from "./supabase";

import PrivateRoute from "./routes/PrivateRoute";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Audits from "./routes/Audits";
import Tutorat from "./routes/Tutorat";
import Wiki from "./routes/Wiki";
import Documents from "./routes/Documents";
import Suggestions from "./routes/Suggestions";
import Entreprise from "./routes/Entreprise";
import GestionUtilisateurs from "./routes/GestionUtilisateurs";
import Habilitations from "./routes/Habilitations";
import PanelControle from "./routes/PanelControle";
import SuggestionsStats from "./routes/SuggestionsStats";

import MainMenu from "./components/MainMenu";

const AppContent = () => {
  const location = useLocation();
  const noMenuRoutes = ["/login", "/register"];
  const showMenu = !noMenuRoutes.includes(location.pathname);

  return (
    <>
      {showMenu && <MainMenu />}

      <Routes>
        {/* ✅ Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Routes privées */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/audits" element={<PrivateRoute><Audits /></PrivateRoute>} />
        <Route path="/tutorat" element={<PrivateRoute><Tutorat /></PrivateRoute>} />
        <Route path="/wiki" element={<PrivateRoute><Wiki /></PrivateRoute>} />
        <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        <Route path="/suggestions" element={<PrivateRoute><Suggestions /></PrivateRoute>} />
        <Route path="/entreprise" element={<PrivateRoute><Entreprise /></PrivateRoute>} />
        <Route path="/utilisateurs" element={<PrivateRoute><GestionUtilisateurs /></PrivateRoute>} />
        <Route path="/habilitations" element={<PrivateRoute><Habilitations /></PrivateRoute>} />
        <Route path="/panel" element={<PrivateRoute><PanelControle /></PrivateRoute>} />
        <Route path="/suggestions-stats" element={<PrivateRoute><SuggestionsStats /></PrivateRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
