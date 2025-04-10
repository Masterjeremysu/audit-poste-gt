import React from "react";
import { Clock, FileText, GraduationCap, Lightbulb, User } from "lucide-react";

const ActivityTimeline = ({ data = [] }) => {
  const icons = {
    tutorat: <GraduationCap className="w-4 h-4 text-purple-600" />,
    document: <FileText className="w-4 h-4 text-blue-600" />,
    suggestion: <Lightbulb className="w-4 h-4 text-yellow-600" />,
    utilisateur: <User className="w-4 h-4 text-green-600" />,
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Activité récente
      </h2>

      <ol className="relative border-l border-gray-300 space-y-4">
        {data.map((event, index) => (
          <li key={index} className="ml-4">
            <div className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full -left-1.5 top-1.5" />
            <div className="flex items-start gap-2 text-sm text-gray-700">
              {icons[event.type]}
              <div>
                <p className="font-medium">{event.label}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ActivityTimeline;
