import React from "react";
import AxiosInstance from "Axios.js";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// components

export default function CardRecentDisabledUsers() {

  const [recentUsers, setRecentUsers] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    if (recentUsers.length > 0) return;

    const fetchRecentDisabledUsers = async () => {
      try {
        const response = await AxiosInstance.get("users/disabledUsers");
        

        setRecentUsers(response.data);
  
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    fetchRecentDisabledUsers();
  });
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Recent Users Requests
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  history.push("/admin/users") // Redirect to users page
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
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Full Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Groups
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {
              recentUsers.map((user)=>(
                <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {user.fullName}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.groups.join(", ")}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {(user.registrationDate+"").substring(0, 10)}
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
