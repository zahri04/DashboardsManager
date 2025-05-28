import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";

export default function EditDashboardModal({ isOpen, onClose, onSave, dashboard }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    base_url: "",
    secret_key: "",
    resourceValue: ""
  });

  useEffect(() => {
    if (dashboard) {
      setFormData({
        id: dashboard.id,
        name: dashboard.name || "",
        description: dashboard.description || "",
        base_url: dashboard.base_url || "",
        secret_key: dashboard.secret_key || "",
        resourceValue: dashboard.resourceValue || "",
      });
    }
  }, [dashboard]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold mb-2">Edit Dashboard</h4>
        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="base_url"
          placeholder="Base URL"
          className="border p-2 w-full"
          value={formData.base_url}
          onChange={handleChange}
        />
        <input
          name="secret_key"
          placeholder="Secret Key"
          className="border p-2 w-full"
          value={formData.secret_key}
          onChange={handleChange}
        />
         <input
          name="resourceValue"
          placeholder="Resource Value"
          className="border p-2 w-full"
          value={formData.resourceValue}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
