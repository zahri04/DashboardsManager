import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AxiosInstance from "../../../Axios";
import Modal from "../../../components/Modal";
import AddGroupModal from "./AddGroupModal";
import EditGroupModal from "./EditGroupModal";

export default function GroupsList() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await AxiosInstance("groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/groups/${id}`);
      fetchGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleAddGroup = async (newGroup) => {
    try {
      await AxiosInstance.post("/groups", newGroup);
      fetchGroups();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleEditGroup = async (updatedGroup) => {
    try {
      await AxiosInstance.put(`/groups/${updatedGroup.id}`, updatedGroup);
      fetchGroups();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleGroupDetails = (group) => {
    setSelectedGroup(group);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blueGray-700">
                  Groups List
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md transition-all duration-150"
                >
                  Add Group
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500 border border-blueGray-100">Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500 border border-blueGray-100">Description</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500 border border-blueGray-100">Authorities</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500 border border-blueGray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 text-xs text-left border-t border-blueGray-100">{group.name}</td>
                    <td className="px-6 py-4 text-xs border-t border-blueGray-100">{group.description}</td>
                    <td className="px-6 py-4 text-xs border-t border-blueGray-100">
                      {group.authoritesList.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-xs border-t border-blueGray-100">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => { setSelectedGroup(group); setIsEditModalOpen(true); }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(group.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => handleGroupDetails(group)}
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddGroup}
      />

      <EditGroupModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditGroup}
        group={selectedGroup}
      />

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        {selectedGroup && (
          <div>
            <h2 className="text-xl font-semibold">Group Details</h2>
            <p><strong>Name:</strong> {selectedGroup.name}</p>
            <p><strong>Description:</strong> {selectedGroup.description}</p>
            <p><strong>Created By:</strong> {selectedGroup.created_by}</p>
            <p><strong>Created At:</strong> {selectedGroup.created_at}</p>
            <p><strong>Authorities:</strong> {selectedGroup.authoritesList.join(", ")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
