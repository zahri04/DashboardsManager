import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import AxiosInstance from "../../../Axios";

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get("users");
      setUsers(response.data);
      console.log("Users fetched:", response.data); // Debugging line
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      await AxiosInstance.post("users", newUser);
      fetchUsers(); // refresh the list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await AxiosInstance.put(`users/${updatedUser.id}`, updatedUser);
      fetchUsers(); // refresh the list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, enabled: !user.enabled } : user
    ));
  };

  const openDetailModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blueGray-700">
                  Users List
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Username
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Groups
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 text-blueGray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openDetailModal(user)}
                  >
                    <td className="border-t px-6 py-4 text-xs">{user.username}</td>
                    <td className="border-t px-6 py-4 text-xs">{user.fullName}</td>
                    <td className="border-t px-6 py-4 text-xs">
                      {user.groupNames?.join(", ") || "—"}
                    </td>
                    <td className="border-t px-6 py-4 text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(user.id);
                        }}
                      >
                        {user.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="border-t px-6 py-4 text-xs">{user.created_at}</td>
                    <td className="border-t px-6 py-4 text-xs">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(user);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user.id);
                          }}
                        >
                          <FaTrash />
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

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedUser && (
          <div>
            <h4 className="text-lg font-semibold mb-4">{selectedUser.fullName}</h4>
            <p className="mb-2"><strong>Username:</strong> {selectedUser.username}</p>
            <p className="mb-2"><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${selectedUser.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {selectedUser.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </p>
            <p className="mb-2"><strong>Groups:</strong> {selectedUser.groupNames?.join(", ") || "None"}</p>
            <p className="mb-2"><strong>Created At:</strong> {selectedUser.created_at}</p>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />

      {/* Edit Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditUser}
        onUpdate={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
}
