import React, { useState } from "react";
import Modal from "../../../components/Modal";

export default function AddGroupModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    authoritesList: []
  });

  const authoritesOptions = [
    "USER_MANAGEMENT",
    "DASHBOARD_MANAGEMENT",
    "AUTHORITY_MANAGEMENT",
    "GROUP_MANAGEMENT",
    "DASHBOARDS_VIEW"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        authoritesList: checked
          ? [...prev.authoritesList, value]
          : prev.authoritesList.filter((val) => val !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.authoritesList.length === 0) {
      alert("All fields are required.");
      return;
    }

    const newGroup = {
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString().split("T")[0],
      created_by: "admin"
    };

    onSave(newGroup);
    onClose();
    setFormData({ name: "", description: "", authoritesList: [] });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold mb-4">Add New Group</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Enter group name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Enter group description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">authorites</label>
          <div className="flex flex-wrap space-x-4">
            {authoritesOptions.map((authority) => (
              <label key={authority} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={authority}
                  checked={formData.authoritesList.includes(authority)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>{authority}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
