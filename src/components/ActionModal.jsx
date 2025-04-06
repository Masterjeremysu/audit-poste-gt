import React from 'react';

const ActionModal = ({ audit, onClose, onSave, actionData, setActionData }) => {
  if (!audit) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActionData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Action corrective – {audit.poste}</h2>

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={actionData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Responsable</label>
              <input
                type="text"
                name="responsable"
                value={actionData.responsable}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Date limite</label>
              <input
                type="date"
                name="date"
                value={actionData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Statut</label>
            <select
              name="statut"
              value={actionData.statut}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>En attente</option>
              <option>En cours</option>
              <option>Résolu</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
