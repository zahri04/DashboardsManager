import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosInstance from "../../../Axios";
import AddAccessModal from "./AddAccessModal";

export default function DashboardAccess() {
  const [accessList, setAccessList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const history = useHistory();

  // Fetch access entries on mount
  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const res = await AxiosInstance.get("/dashboardAccess");
        setAccessList(res.data || []);
      } catch (e) {
        console.error("Error fetching access list:", e);
        setErrorMessage("Failed to load dashboard access.");
      }
    };
    fetchAccess();
  }, []);

  // Group by groupName
  const grouped = accessList.reduce((acc, item) => {
    acc[item.groupName] = acc[item.groupName] || [];
    acc[item.groupName].push(item);
    return acc;
  }, {});

  // Delete an access entry
  const handleDelete = async (dashboardId, groupId) => {
    try {
      await AxiosInstance.delete(`/dashboardAccess/${groupId}/${dashboardId}`);
      setAccessList(list =>
        list.filter(item => !(item.dashboardId === dashboardId && item.groupId === groupId))
      );
    } catch (e) {
      console.error("Failed to delete access", e);
      setErrorMessage("Failed to delete entry.");
    }
  };

  // Save updated permissions (edit handles changing assignment)
  const handleSave = async (updated) => {
    try {
      await AxiosInstance.put(
        `/dashboardAccess/${updated.groupId}/${updated.dashboardId}`,
        updated
      );
      setEditOpen(false);
      setAccessList(list =>
        list.map(item =>
          item.groupId === updated.groupId && item.dashboardId === updated.dashboardId
            ? updated
            : item
        )
      );
    } catch (e) {
      console.error("Failed to save changes", e);
      setErrorMessage("Failed to save changes.");
    }
  };

  // Handle new (batch) assignments
  const handleAdd = async (batchDto) => {
    try {
      await AxiosInstance.post(`/dashboardAccess/batch`, {
        dashboardIds: batchDto.dashboardIds,
        groupIds:     batchDto.groupIds,
        canView:      batchDto.canView,
        canEdit:      batchDto.canEdit,
      });
      setAddOpen(false);
      const { data } = await AxiosInstance.get("/dashboardAccess");
      setAccessList(data || []);
    } catch (e) {
      console.error("Failed to assign access", e);
      setErrorMessage("Failed to assign access.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      {/* Assign Access Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setAddOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Assign Access
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Group", "Dashboard", "Actions"].map(h => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(grouped).map(([groupName, dashboards]) => (
              <React.Fragment key={groupName}>
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-2 bg-gray-100 text-sm font-semibold text-gray-700"
                  >
                    {groupName}
                  </td>
                </tr>

                {dashboards.map(d => (
                  <tr key={`${d.groupId}-${d.dashboardId}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm"></td>
                    <td className="px-6 py-4 text-sm">{d.dashboardName}</td>
                    <td className="px-6 py-4 text-sm space-x-4">

                      <button
                        onClick={() => handleDelete(d.dashboardId, d.groupId)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {accessList.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No access assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <AddAccessModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
);
}
