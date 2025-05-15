import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import AddModal from "./AddDashboardModal";
import EditDashboardModal from "./EditDashboardModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import AxiosInstance from "../../../Axios";
import { useAuth } from "../../../context/AuthContext";


export default function DashboardsList() {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dashboards, setDashboards] = useState([]);

  const { user } = useAuth();

  const fetchDashboards = async () => {
    try {
      const response = await AxiosInstance.get("/dashboard");
      setDashboards(response.data);
    } catch (error) {
      console.error("Error fetching dashboards:", error);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/dashboard/${id}`);
      await fetchDashboards();
    } catch (error) {
      console.error("Error deleting dashboard:", error);
    }
  };

  const handleAddDashboard = async (newDashboard) => {
    try {
      await AxiosInstance.post("/dashboard", newDashboard);
      await fetchDashboards();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding dashboard:", error);
    }
  };

  const handleEditDashboard = async (updatedDashboard) => {
    try {
      await AxiosInstance.put(`/dashboard/${updatedDashboard.id}`, updatedDashboard);
      await fetchDashboards();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating dashboard:", error);
    }
  };

  const openViewModal = (dashboard) => {
    setSelectedDashboard(dashboard);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blueGray-700">
                  Dashboards List
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Add Dashboard
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  {["Name", "Description", "Base URL", "Created By", "Created At", "Actions"].map((head) => (
                    <th
                      key={head}
                      className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dashboards.map((dashboard) => (
                  <tr
                    key={dashboard.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openViewModal(dashboard)}
                  >
                    <td className="border-t-0 px-6 py-4 text-xs">{dashboard.name}</td>
                    <td className="border-t-0 px-6 py-4 text-xs">{dashboard.description}</td>
                    <td className="border-t-0 px-6 py-4 text-xs">
                      <a href={dashboard.base_url} className="text-blue-500 hover:underline">
                        {dashboard.base_url}
                      </a>
                    </td>
                    <td className="border-t-0 px-6 py-4 text-xs">{dashboard.created_by}</td>
                    <td className="border-t-0 px-6 py-4 text-xs">{dashboard.created_at}</td>
                    <td className="border-t-0 px-6 py-4 text-xs">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDashboard(dashboard);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(dashboard.id);
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

      {/* View Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedDashboard && (
          <div>
            <h4 className="text-lg font-semibold mb-4">{selectedDashboard.name}</h4>
            <p className="mb-2"><strong>Description:</strong> {selectedDashboard.description}</p>
            <p className="mb-2"><strong>Base URL:</strong> {selectedDashboard.base_url}</p>
            <p className="mb-2"><strong>Created By:</strong> {selectedDashboard.created_by}</p>
            <p className="mb-2"><strong>Created At:</strong> {selectedDashboard.created_at}</p>
            <div className="mt-4">
              <h5 className="font-semibold">Additional Details:</h5>
              <p>{selectedDashboard.additionalDetails || "No additional details available."}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Dashboard Modal */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDashboard}
      />

      {/* Edit Dashboard Modal */}
      <EditDashboardModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditDashboard}
        dashboard={selectedDashboard}
      />
    </div>
  );
}
