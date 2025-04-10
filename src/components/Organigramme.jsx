// ✅ Organigramme enrichi : avatar, email, tuteur, historique + modale
import React, { useState } from "react";
import { User } from "lucide-react";

const orgData = {
  complete: [
    {
      name: "Nicolas Barthalay",
      title: "Responsable de site",
      email: "nicolas.barthalay@entreprise.fr",
      avatar: "https://ui-avatars.com/api/?name=Nicolas+Barthalay",
      tutorat: null,
      historique: ["Pilote sécurité site", "Création audits", "Référent multi-zones"],
      children: [
        {
          name: "Jérémy Suzet",
          title: "Resp. Activités PDT",
          email: "jeremy.suzet@entreprise.fr",
          avatar: "https://ui-avatars.com/api/?name=Jérémy+Suzet",
          tutorat: "Nicolas Barthalay",
          historique: ["Encadrant PDT", "Suivi habilitations", "Tuteur confirmé"],
          children: [
            {
              name: "Dramane Coly",
              title: "Adjoint PDT",
              email: "dramane.coly@entreprise.fr",
              avatar: "https://ui-avatars.com/api/?name=Dramane+Coly",
              tutorat: "Jérémy Suzet",
              historique: ["Référent CACES", "Tuteur"],
              children: [
                {
                  name: "Grégory Faure",
                  title: "Leader PDT",
                  email: "gregory.faure@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Gregory+Faure",
                  tutorat: "Dramane Coly",
                  historique: ["Formateur interne", "Responsable planning zone"],
                  children: [
                    {
                      name: "César Descot",
                      title: "Opérateur PDT",
                      email: "cesar.descot@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Cesar+Descot",
                      tutorat: "Grégory Faure",
                      historique: ["Formé sur zone A", "Habilitation feu"]
                    },
                    {
                      name: "Guillaume Ond",
                      title: "Alternant PDT",
                      email: "guillaume.ond@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Guillaume+Ond",
                      tutorat: "Grégory Faure",
                      historique: ["En formation tutorée"]
                    },
                    {
                      name: "Kévin",
                      title: "Mi-temps PDT",
                      email: "kevin@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Kevin",
                      note: "Présent les matins uniquement sauf le mercredi",
                      tutorat: "Grégory Faure",
                      historique: ["Support back-up"]
                    },
                    {
                      name: "Sacha",
                      title: "Opérateur PDT",
                      email: "sacha@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Sacha",
                      tutorat: "Grégory Faure",
                      historique: ["Opérateur confirmé"]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "Guillaume MAITI",
          title: "Resp. Activités Silicium",
          email: "guillaume.maiti@entreprise.fr",
          avatar: "https://ui-avatars.com/api/?name=Guillaume+MAITI",
          tutorat: "Nicolas Barthalay",
          historique: ["Créateur process Silicium", "Pilote validation conformité"],
          children: [
            {
              name: "Charly Rousson",
              title: "Leader Silicium",
              email: "charly.rousson@entreprise.fr",
              avatar: "https://ui-avatars.com/api/?name=Charly+Rousson",
              tutorat: "Guillaume MAITI",
              historique: ["Responsable zone humidité", "Référent propreté"],
              children: [
                {
                  name: "Jimmy Dejean",
                  title: "Leader Planning",
                  email: "jimmy.dejean@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Jimmy+Dejean",
                  tutorat: "Charly Rousson",
                  historique: ["Gestion planning production", "Tuteur Silicium"],
                  children: [
                    { name: "Erko",
                    email: "erko@entreprise.fr",
                    avatar: "https://ui-avatars.com/api/?name=Erko",
                    tutorat: "Jimmy Dejean",
                    historique: ["Opérateur confirmé"],
                    title: "Opérateur Silicium" },
                    { name: "Manon Michel",
                    email: "manon.michel@entreprise.fr",
                    avatar: "https://ui-avatars.com/api/?name=Manon+Michel",
                    tutorat: "Jimmy Dejean",
                    historique: ["Alternante production"],
                    title: "Alternante Silicium" },
                    { name: "Fatima",
                    email: "fatima@entreprise.fr",
                    avatar: "https://ui-avatars.com/api/?name=Fatima",
                    tutorat: "Jimmy Dejean",
                    historique: ["Formation sécurité", "Process en cours"],
                    title: "En formation", note: "Formation jusqu'à juin 2025" },
                    { name: "Jean-Michel",
                    email: "jean-michel@entreprise.fr",
                    avatar: "https://ui-avatars.com/api/?name=Jean-Michel",
                    tutorat: "Jimmy Dejean",
                    historique: ["Production Silicium"],
                    title: "Opérateur" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  PDT: [
    {
      name: "Nicolas Barthalay",
      title: "Responsable de site",
      email: "nicolas.barthalay@entreprise.fr",
      avatar: "https://ui-avatars.com/api/?name=Nicolas+Barthalay",
      tutorat: null,
      historique: ["Pilote sécurité site", "Création audits", "Référent multi-zones"],
      children: [
        {
          name: "Jérémy Suzet",
          title: "Resp. Activités PDT",
          email: "jeremy.suzet@entreprise.fr",
          avatar: "https://ui-avatars.com/api/?name=Jérémy+Suzet",
          tutorat: "Nicolas Barthalay",
          historique: ["Encadrant PDT", "Suivi habilitations", "Tuteur confirmé"],
          children: [
            {
              name: "Dramane Coly",
              title: "Adjoint PDT",
              email: "dramane.coly@entreprise.fr",
              avatar: "https://ui-avatars.com/api/?name=Dramane+Coly",
              tutorat: "Jérémy Suzet",
              historique: ["Référent CACES", "Tuteur"],
              children: [
                {
                  name: "Grégory Faure",
                  title: "Leader PDT",
                  email: "gregory.faure@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Gregory+Faure",
                  tutorat: "Dramane Coly",
                  historique: ["Formateur interne", "Responsable planning zone"],
                  children: [
                    {
                      name: "César Descot",
                      title: "Opérateur PDT",
                      email: "cesar.descot@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Cesar+Descot",
                      tutorat: "Grégory Faure",
                      historique: ["Formé sur zone A", "Habilitation feu"]
                    },
                    {
                      name: "Guillaume Ond",
                      title: "Alternant PDT",
                      email: "guillaume.ond@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Guillaume+Ond",
                      tutorat: "Grégory Faure",
                      historique: ["En formation tutorée"]
                    },
                    {
                      name: "Kévin",
                      title: "Mi-temps PDT",
                      email: "kevin@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Kevin",
                      note: "Présent les matins uniquement sauf le mercredi",
                      tutorat: "Grégory Faure",
                      historique: ["Support back-up"]
                    },
                    {
                      name: "Sacha",
                      title: "Opérateur PDT",
                      email: "sacha@entreprise.fr",
                      avatar: "https://ui-avatars.com/api/?name=Sacha",
                      tutorat: "Grégory Faure",
                      historique: ["Opérateur confirmé"]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  Silicium: [
    {
      name: "Guillaume MAITI",
      title: "Resp. Activités Silicium",
      email: "guillaume.maiti@entreprise.fr",
      avatar: "https://ui-avatars.com/api/?name=Guillaume+MAITI",
      tutorat: "Nicolas Barthalay",
      historique: ["Créateur process Silicium", "Pilote validation conformité"],
      children: [
        {
          name: "Charly Rousson",
          title: "Leader Silicium",
          email: "charly.rousson@entreprise.fr",
          avatar: "https://ui-avatars.com/api/?name=Charly+Rousson",
          tutorat: "Guillaume MAITI",
          historique: ["Responsable zone humidité", "Référent propreté"],
          children: [
            {
              name: "Jimmy Dejean",
              title: "Leader Planning",
              email: "jimmy.dejean@entreprise.fr",
              avatar: "https://ui-avatars.com/api/?name=Jimmy+Dejean",
              tutorat: "Charly Rousson",
              historique: ["Gestion planning production", "Tuteur Silicium"],
              children: [
                {
                  name: "Erko",
                  title: "Opérateur Silicium",
                  email: "erko@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Erko",
                  tutorat: "Jimmy Dejean",
                  historique: ["Opérateur confirmé"]
                },
                {
                  name: "Manon Michel",
                  title: "Alternante Silicium",
                  email: "manon.michel@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Manon+Michel",
                  tutorat: "Jimmy Dejean",
                  historique: ["Alternante production"]
                },
                {
                  name: "Fatima",
                  title: "En formation",
                  note: "Formation jusqu'à juin 2025",
                  email: "fatima@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Fatima",
                  tutorat: "Jimmy Dejean",
                  historique: ["Formation sécurité", "Process en cours"]
                },
                {
                  name: "Jean-Michel",
                  title: "Opérateur",
                  email: "jean-michel@entreprise.fr",
                  avatar: "https://ui-avatars.com/api/?name=Jean-Michel",
                  tutorat: "Jimmy Dejean",
                  historique: ["Production Silicium"]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const OrgCard = ({ name, title, note, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer relative group transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white via-sky-50 to-blue-100 shadow-lg rounded-2xl p-4 border-l-[5px] border-blue-500 text-center min-w-[200px] max-w-[250px]"
  >
    <div className="flex justify-center mb-2">
      <div className="bg-blue-100 p-3 rounded-full shadow-inner">
        <User className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div className="font-bold text-blue-900 text-sm leading-tight">{name}</div>
    <div className="text-xs text-gray-600 italic">{title}</div>
    {note && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-blue-900 text-white text-xs rounded px-3 py-1 shadow-xl max-w-xs w-max">
        {note}
      </div>
    )}
  </div>
);

const TreeNode = ({ node, onSelect }) => (
  <div className="flex flex-col items-center">
    <OrgCard name={node.name} title={node.title} note={node.note} onClick={() => onSelect(node)} />
    {node.children && (
      <div className="flex mt-8 gap-6 border-t-2 border-blue-400 pt-6">
        {node.children.map((child, i) => (
          <TreeNode key={i} node={child} onSelect={onSelect} />
        ))}
      </div>
    )}
  </div>
);

const Organigramme = () => {
  const [vue, setVue] = useState("complete");
  const [selected, setSelected] = useState(null);
  const currentView = orgData[vue] || [];

  return (
    <div className="relative p-10 bg-gradient-to-br from-white via-sky-50 to-blue-100 rounded-lg shadow-2xl">
      <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => setVue("complete")} className={`px-6 py-2 rounded-xl font-semibold ${vue === "complete" ? "bg-blue-600 text-white" : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-100"}`}>
          🌐 Vue complète
        </button>
        <button onClick={() => setVue("PDT")} className={`px-6 py-2 rounded-xl font-semibold ${vue === "PDT" ? "bg-blue-600 text-white" : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-100"}`}>
          🧪 Vue PDT
        </button>
        <button onClick={() => setVue("Silicium")} className={`px-6 py-2 rounded-xl font-semibold ${vue === "Silicium" ? "bg-blue-600 text-white" : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-100"}`}>
          ⚗️ Vue Silicium
        </button>
      </div>

      <div className="overflow-auto pb-12 px-2 md:px-12">
        <div className="flex justify-center">
          {currentView.map((node, i) => (
            <TreeNode key={i} node={node} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[320px] text-center relative">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-gray-500 hover:text-red-500">✖️</button>
            {selected.avatar && <img src={selected.avatar} alt={selected.name} className="w-16 h-16 rounded-full mx-auto mb-3" />}
            <div className="text-lg font-bold text-blue-700">{selected.name}</div>
            <div className="text-sm italic text-gray-500">{selected.title}</div>
            {selected.email && <div className="text-xs text-gray-400 mb-2">{selected.email}</div>}
            {selected.tutorat && <p className="text-sm text-gray-600">👨‍🏫 Tuteur : <strong>{selected.tutorat}</strong></p>}
            {selected.historique && (
              <div className="text-left mt-4">
                <p className="text-sm font-semibold">🗂️ Historique :</p>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {selected.historique.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Organigramme;
