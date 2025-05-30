import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import AxiosInstance from "../../../Axios";
export default function EditUserModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    enabled: false,
    groupNames: [],
  });
   const [groups,setGroups] = useState([]);
  
    const fetchGroups = async () => {
      try {
        const response = await AxiosInstance.get("groups");
        setGroups(response.data.content.map(group => group.name)); // Assuming each group has a 'name' property
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }
  
    useEffect(() => {
      fetchGroups();
    }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        fullName: user.fullName || "",
        enabled: user.enabled || false,
        groupNames: user.groupNames || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (name === "groupNames") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData({ ...formData, groupNames: selected });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
            />
            <span>Enabled</span>
          </label>

          <label className="block">
            <span className="block mb-1 font-medium">Groups</span>
            <select
              name="groupNames"
              multiple
              value={formData.groupNames}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded h-32"
            >
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
