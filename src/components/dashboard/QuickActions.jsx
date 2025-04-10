import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  FileText,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";

const actions = [
  {
    title: "Nouveau tutorat",
    icon: <GraduationCap className="w-5 h-5" />,
    to: "/parcours-config",
  },
  {
    title: "Ajouter un document",
    icon: <FileText className="w-5 h-5" />,
    to: "/documents",
  },
  {
    title: "Valider un parcours",
    icon: <ClipboardCheck className="w-5 h-5" />,
    to: "/tuteur",
  },
  {
    title: "Proposer une idée",
    icon: <PlusCircle className="w-5 h-5" />,
    to: "/suggestions",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => navigate(action.to)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition text-sm font-medium"
        >
          {action.icon}
          {action.title}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
