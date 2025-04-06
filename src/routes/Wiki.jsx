
import React, { useEffect, useState } from 'react';


const Wiki = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'Utilisateur');
  }, []);

  const sections = [
    {
      title: '🧾 Audits de poste',
      content:
        "Ce module permet de créer, suivre et consulter les audits internes liés à un poste. Vous pouvez y ajouter des commentaires, des photos et exporter un PDF du rapport.",
    },
    {
      title: '🎓 Dossiers de tutorat',
      content:
        "Utilisez ce module pour suivre l’intégration d’un nouveau salarié. Vous pouvez renseigner le tuteur, les étapes validées et générer une synthèse finale.",
    },
    {
      title: '🏢 Vie en entreprise',
      content:
        "Ce module permet de centraliser les fiches d’accueil, formations, habilitations et suggestions internes. Il est pensé pour renforcer le lien social et la sécurité.",
    },
    {
      title: '❓ Questions fréquentes',
      content:
        "• Comment changer mon rôle ? → Voir avec l'administrateur.\n• Où sont stockés les documents ? → Dans SharePoint (ou local selon config).\n• Que faire si une étape est bloquée ? → Utilisez le bouton 'commentaire' ou contactez un référent.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Centre d’aide - Wiki</h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="whitespace-pre-line text-gray-700">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wiki;
