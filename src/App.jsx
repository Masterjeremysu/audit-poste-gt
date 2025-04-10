import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./routes/PrivateRoute";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Audits from "./routes/Audits";
import Tutorat from "./routes/Tutorat";
import AjoutDocument from "./routes/AjoutDocument";
import Documents from "./routes/Documents";
import Suggestions from "./routes/Suggestions";
import InfoEntreprise from "./routes/InfoEntreprise";
import GestionUtilisateurs from "./routes/GestionUtilisateurs";
import Habilitations from "./routes/Habilitations";
import PanelControle from "./routes/PanelControle";
import SuggestionsStats from "./routes/SuggestionsStats";
import ParcoursTutoratConfig from "./routes/ParcoursTutoratConfig";
import Page404 from "./routes/Page404";
import PageTutore from "./routes/PageTutore";
import PageTuteur from "./routes/PageTuteur";
import ParcoursTimeline from "./routes/ParcoursTimeline";
import EditDocument from "@/routes/EditDocument";



import SidebarLayout from "./components/SidebarLayout";

const AppContent = () => {
  const location = useLocation();
  const noMenuRoutes = ["/login", "/register"];
  const showLayout = !noMenuRoutes.includes(location.pathname);

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Page404 />} />  {/* 👈 Page 404 si aucune route ne correspond */}

      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/audits" element={<PrivateRoute><Audits /></PrivateRoute>} />
      <Route path="/tutorat" element={<PrivateRoute><Tutorat /></PrivateRoute>} />
      <Route path="/documents/ajout" element={<PrivateRoute><AjoutDocument /></PrivateRoute>} />
      <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
      <Route path="/suggestions" element={<PrivateRoute><Suggestions /></PrivateRoute>} />
      <Route path="/entreprise" element={<PrivateRoute><InfoEntreprise /></PrivateRoute>} />

      <Route path="/utilisateurs" element={<PrivateRoute><GestionUtilisateurs /></PrivateRoute>} />
      <Route path="/habilitations" element={<PrivateRoute><Habilitations /></PrivateRoute>} />
      <Route path="/panel" element={<PrivateRoute><PanelControle /></PrivateRoute>} />
      <Route path="/suggestions-stats" element={<PrivateRoute><SuggestionsStats /></PrivateRoute>} />
      <Route path="/parcours-config" element={<PrivateRoute><ParcoursTutoratConfig /></PrivateRoute>} />
      <Route path="/tutore" element={<PrivateRoute><PageTutore /></PrivateRoute>} />
      <Route path="/parcours-timeline" element={<PrivateRoute><ParcoursTimeline /></PrivateRoute>} />
      <Route path="/tuteur" element={<PrivateRoute><PageTuteur /></PrivateRoute>} />
      <Route path="/documents/edit/:id" element={<EditDocument />} />




    </Routes>
  );

  return showLayout ? <SidebarLayout>{routes}</SidebarLayout> : routes;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
