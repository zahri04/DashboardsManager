import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";
import AxiosInstance from "../../../Axios";
import Modal from "../../../components/Modal";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

export default function UsersList() {
  // data
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  // modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // filters
  const [username, setUsername] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [fullName, setFullName] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [enabled, setEnabled] = useState("all");
  const [createdAfter, setCreatedAfter] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [updatedAfter, setUpdatedAfter] = useState("");
  const [updatedBefore, setUpdatedBefore] = useState("");

  // messages error and success
  const [messageType, setMessageType] = useState("");
  const [message,setMessage]=useState("")

  // helper to ISO
  const toFullISOString = (lv) => {
    const d = new Date(lv);
    return isNaN(d) ? undefined : d.toISOString().slice(0, -1);
  };

  // build query params
  const buildParams = () => ({
    ...(username && { username }),
    ...(fullName && { fullName }),
    ...(groupNames.length && { groupNames: groupNames.join(",") }),
    ...(enabled !== "all" && { enabled }),
    pageNumber,
    pageSize,
    ...(createdAfter && { createdAfter: toFullISOString(createdAfter) }),
    ...(createdBefore && { createdBefore: toFullISOString(createdBefore) }),
    ...(updatedAfter && { updatedAfter: toFullISOString(updatedAfter) }),
    ...(updatedBefore && { updatedBefore: toFullISOString(updatedBefore) }),
  });

  // fetch
  const fetchGroups = async () => {
    try {
      const res = await AxiosInstance.get("groups");
      setGroups(res.data.content.map((g) => g.name));
    } catch (e) { console.error(e); }
  };
  const fetchUsers = async () => {
    try {
      const res = await AxiosInstance.get("users", { params: buildParams() });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages || 1);

    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchGroups();
    fetchUsers();
      setMessage('');
      setMessageType('');
  }, [
    pageNumber,
    username,
    fullName,
    groupNames,
    enabled,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
  ]);

  // actions
  const handleAdd = async (u) => { 
    try{
     await AxiosInstance.post("users", u); 
     
     setMessageType('success');
     setMessage("User added successfully!");
     fetchUsers(); 
    }catch(err){
      setMessage(err.response.data);
      setMessageType('error');
      

    }
    
  };
  const handleEdit = async (u) => {
   
     try{
     
      await AxiosInstance.put(`users/${u.id}`, u);
     setMessageType('success');
     setMessage("User Updated successfully!");
     fetchUsers(); 
    }catch(err){
      setMessage(err.response.data);
      setMessageType('error');
      

    }
    };
  const handleDelete = async (id) => {
    if(!window.confirm("are you sure to delete this user")) return ;
   
    try{
      await AxiosInstance.delete(`users/${id}`);
     setMessageType('success');
     setMessage("User Deleted successfully!");
     fetchUsers(); 
    }catch(err){
      setMessage(err.response.data);
      setMessageType('error');
      

    }
  };
  const toggleStatus = (id) => setUsers((us) =>
    us.map((u) => u.id === id ? { ...u, enabled: !u.enabled } : u)
  );

  // pagination controls
  const goTo = (n) => setPageNumber(Math.max(0, Math.min(n, totalPages - 1)));

  return (
    <div className="p-6 space-y-6">

           {message && (
        <div className={` border px-4 py-2 rounded
        ${messageType==='error' ? ' bg-red-100 border-red-400 text-red-700':' bg-green-100 border-green-400 text-green-700'  }
        `}>
          {message}
        </div>
      )
    }

      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Users List</h3>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add User
        </button>
      </div>

      {/* search + filter toggle */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500"
        />
        <button
          onClick={() => setShowFilters((f) => !f)}
          className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-500"
        >
          <HiFilter className="h-5 w-5" />
          Filters {showFilters ? <HiChevronUp /> : <HiChevronDown />}
        </button>
        <button
          onClick={() => {
            setUsername("");
            setFullName("");
            setGroupNames([]);
            setEnabled("all");
            setCreatedAfter("");
            setCreatedBefore("");
            setUpdatedAfter("");
            setUpdatedBefore("");
          }}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* collapsible filters */}
      {showFilters && (
        <div className="bg-white p-6 shadow rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Groups */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Groups
            </label>
            <select
              multiple
              value={groupNames}
              onChange={(e) =>
                setGroupNames(Array.from(e.target.selectedOptions, (o) => o.value))
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-indigo-500 appearance-none"
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <HiChevronDown className="pointer-events-none absolute right-3 top-10 text-gray-400" />
          </div>
          {/* Status */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={enabled}
              onChange={(e) => setEnabled(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-indigo-500 appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="1">Enabled</option>
              <option value="0">Disabled</option>
            </select>
            <HiChevronDown className="pointer-events-none absolute right-3 top-10 text-gray-400" />
          </div>
          {/* Created After */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Created After
            </label>
            <input
              type="datetime-local"
              value={createdAfter}
              onChange={(e) => setCreatedAfter(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Created Before */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Created Before
            </label>
            <input
              type="datetime-local"
              value={createdBefore}
              onChange={(e) => setCreatedBefore(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Updated After */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Updated After
            </label>
            <input
              type="datetime-local"
              value={updatedAfter}
              onChange={(e) => setUpdatedAfter(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Updated Before */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Updated Before
            </label>
            <input
              type="datetime-local"
              value={updatedBefore}
              onChange={(e) => setUpdatedBefore(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Username", "Full Name", "Groups", "Status", "Created At", "Actions"].map((h) => (
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
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{u.username}</td>
                <td className="px-6 py-4 text-sm">{u.fullName}</td>
                <td className="px-6 py-4 text-sm">{u.groupNames.join(", ")}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    onClick={() => toggleStatus(u.id)}
                    className={`inline-block px-2 py-1 rounded-full text-xs cursor-pointer ${
                      u.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{(u.created_at+"").substring(0,10)}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button onClick={() => { setSelectedUser(u); setIsEditOpen(true); }}>
                    <FaEdit className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(u.id)}>
                    <FaTrash className="text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => goTo(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`px-3 py-1 rounded ${
              pageNumber === i ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goTo(pageNumber + 1)}
          disabled={pageNumber === totalPages - 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* detail modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        {selectedUser && (
          <div>
            <h4 className="text-lg font-semibold mb-4">{selectedUser.fullName}</h4>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedUser.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {selectedUser.enabled ? "Enabled" : "Disabled"}
              </span>
            </p>
            <p><strong>Groups:</strong> {selectedUser.groupNames.join(", ")}</p>
            <p><strong>Created At:</strong> {selectedUser.created_at}</p>
          </div>
        )}
      </Modal>

      {/* add/edit modals */}
      <AddUserModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={handleEdit}
        user={selectedUser}
      />
    </div>
  );
}
