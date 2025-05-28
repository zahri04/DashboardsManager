import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import AxiosInstance from "../../../Axios";

export default function AddAccessModal({ isOpen, onClose, onAdd }) {
  const [dashboards, setDashboards] = useState([]);
  const [groups, setGroups] = useState([]);
  const [dashboardIds, setDashboardIds] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const [canView, setCanView] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setError("");
    setDashboardIds([]);
    setGroupIds([]);
    setCanView(true);
    setCanEdit(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashRes, grpRes] = await Promise.all([
          AxiosInstance.get("/dashboard/all"),
          AxiosInstance.get("/groups/all")
        ]);
        setDashboards(dashRes.data || []);
        setGroups(grpRes.data || []);
      } catch (e) {
        console.error("Error loading options", e);
        setError("Failed to load dashboards or groups.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen]);

  const handleDashboardChange = e =>
    setDashboardIds(
      Array.from(e.target.selectedOptions).map(o => Number(o.value))
    );

  const handleGroupChange = e =>
    setGroupIds(
      Array.from(e.target.selectedOptions).map(o => Number(o.value))
    );

  const handleSubmit = () => {
    if (dashboardIds.length === 0 || groupIds.length === 0) {
      setError("Please select at least one dashboard and one group.");
      return;
    }
    onAdd({ dashboardIds, groupIds, canView, canEdit });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Assign Dashboards to Groups</h4>

        {loading && <p>Loading options…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Dashboards</label>
          <select
            multiple
            value={dashboardIds}
            onChange={handleDashboardChange}
            className="w-full border-gray-300 rounded p-2 h-32"
          >
            {dashboards.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Groups</label>
          <select
            multiple
            value={groupIds}
            onChange={handleGroupChange}
            className="w-full border-gray-300 rounded p-2 h-32"
          >
            {groups.map(g => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={canView}
              onChange={() => setCanView(v => !v)}
              className="mr-2"
            />
            Can View
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={canEdit}
              onChange={() => setCanEdit(e => !e)}
              className="mr-2"
            />
            Can Edit
          </label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
}
