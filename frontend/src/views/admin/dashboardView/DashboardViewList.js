import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AxiosInstance from "../../../Axios";

export default function DashboardViewList() {
  const [groups, setGroups] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const fetchDashboards = async () => {
    try {
      const res = await AxiosInstance.get("/dashboardView");
      console.log("Fetched dashboards:", res.data);
      setGroups(res.data || {});
    } catch (e) {
      console.error("Error fetching dashboards:", e);
      setErrorMessage("Failed to fetch dashboards.");
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  const handleView = (id) => {
    // find across all groups
    const exists = Object.values(groups).some(arr =>
      arr.find(d => d.id === id)
    );
    if (exists) {
      setErrorMessage("");
      history.push(`/admin/dashboardView/${id}`);
    } else {
      setErrorMessage("Error: Dashboard not found.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Group", "Name", "Description", "Actions"].map(h => (
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
            {Object.entries(groups).map(([groupName, dashboards]) => (
              <React.Fragment key={groupName}>
                {/* Group Header Row */}
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-2 bg-gray-100 text-sm font-semibold text-gray-700"
                  >
                    {groupName}
                  </td>
                </tr>

                {/* Dashboards in this Group */}
                {dashboards.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm"></td>
                    <td className="px-6 py-4 text-sm">{d.name}</td>
                    <td className="px-6 py-4 text-sm">{d.description}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleView(d.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* No dashboards at all */}
            {Object.keys(groups).length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No dashboards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
