import React from "react";
import AxiosInstance from "Axios.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// components

export default function CardGroupsStats() {

  const [groupsStats, setGroupsStats] = React.useState([]);
  const history=useHistory();
React.useEffect(() => {
  if(groupsStats.length > 0) return;

    const fetchGroupsStats = async () => {
      try {
        const response = await AxiosInstance.get("groups/stats");
        
        console.log("Groups Stats:", response.data);

        setGroupsStats(response.data);
  
      } catch (error) {
        console.error("Error fetching Groups Stats:", error);
      }
    };

    fetchGroupsStats();
  });
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Groups Statistics
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  history.push("/admin/groups") // Redirect to groups page;
                }}
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Number of Users
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {groupsStats.map((group) => (
                 <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {group.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {group.usersCount}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {
                  (group.percentage +"").substring(0,3).endsWith('.') 
                  ? (group.percentage +"").substring(0,3).slice(0,-1) : (group.percentage +"").substring(0,3)}%
                </td>
              </tr>
           
               ))} 
             
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
