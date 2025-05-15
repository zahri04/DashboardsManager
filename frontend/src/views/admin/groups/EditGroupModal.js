import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";

export default function EditGroupModal({ isOpen, onClose, onSave, group }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [authoritesList, setauthoritesList] = useState([]);

  const authoritesOptions = [
    "USER_MANAGEMENT",
    "DASHBOARD_MANAGEMENT",
    "AUTHORITY_MANAGEMENT",
    "GROUP_MANAGEMENT",
    "DASHBOARDS_VIEW"
  ];

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
      setauthoritesList(group.authoritesList || []);
    }
  }, [group]);

  const handleSubmit = () => {
    if (name.trim() === "") return;

    const updatedGroup = {
      ...group,
      name,
      description,
      authoritesList
    };

    onSave(updatedGroup);
    onClose();
  };

  const handleAuthorityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setauthoritesList((prev) => [...prev, value]);
    } else {
      setauthoritesList((prev) => prev.filter((auth) => auth !== value));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Group</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">authorites</label>
          <div className="flex flex-wrap space-x-4">
            {authoritesOptions.map((authority) => (
              <label key={authority} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={authority}
                  checked={authoritesList.includes(authority)}
                  onChange={handleAuthorityChange}
                  className="form-checkbox"
                />
                <span>{authority}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
