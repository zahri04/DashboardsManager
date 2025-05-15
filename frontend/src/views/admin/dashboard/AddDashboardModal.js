import React, { use, useState } from "react";
import Modal from "../../../components/Modal";
import { useAuth } from "context/AuthContext";

export default function AddModal({ isOpen, onClose, onAdd }) {
  const {user}= useAuth();
  
  const [created_by] = useState(user.username || null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_url: "",
    secret_key: "",
    created_by_username: created_by,
  });

 if (!user) {
    return null; // or handle the case when user is not available
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
    setFormData({
      name: "",
      description: "",
      base_url: "",
     secret_key: "",
     created_by_username:""
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold mb-2">Add New Dashboard</h4>
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
          hidden
          name="created_by_username"
          placeholder="created_by"
          className="border p-2 w-full"
          value={created_by}
          onChange={handleChange}
          />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
