import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import AxiosInstance from "../../../Axios";
import Modal from "../../../components/Modal";
import AddDashboardModal from "./AddDashboardModal";
import EditDashboardModal from "./EditDashboardModal";

export default function DashboardsList() {
  // data + pagination
  const [dashboards, setDashboards] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // modal state
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // filter state
  const [name, setName] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [description, setDescription] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [resourceValue, setResourceValue] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [updatedAfter, setUpdatedAfter] = useState("");
  const [updatedBefore, setUpdatedBefore] = useState("");

    // messages error and success
    const [messageType, setMessageType] = useState("");
    const [message,setMessage]=useState("")

  const history = useHistory();

  const toISO = (v) => {
    const d = new Date(v);
    return isNaN(d) ? undefined : d.toISOString().slice(0, -1);
  };

  // build query params
  const buildParams = () => ({
    ...(name && { name }),
    ...(description && { description }),
    ...(baseUrl && { base_url: baseUrl }),
    ...(secretKey && { secret_key: secretKey }),
    ...(resourceValue && { resourceValue }),
    ...(createdAfter && { createdAfter: toISO(createdAfter) }),
    ...(createdBefore && { createdBefore: toISO(createdBefore) }),
    ...(updatedAfter && { updatedAfter: toISO(updatedAfter) }),
    ...(updatedBefore && { updatedBefore: toISO(updatedBefore) }),
    pageNumber,
    pageSize,
  });

  // fetch dashboards
   const fetchDashboards = async () => {
    try {
      const res = await AxiosInstance.get("/dashboard", {
        params: buildParams(),
      });
      setDashboards(res.data.content);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      console.error("Error fetching dashboards:", e);
    }
  };
  useEffect(()=>{
   
    fetchDashboards()
   }, [
    pageNumber,
    name,
    description,
    baseUrl,
    secretKey,
    resourceValue,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
  ]);

  // actions
  const handleAdd = async (d) => {
   
      try{
         await AxiosInstance.post("/dashboard", d);
         setMessageType('success');
         setMessage("Dashboard Added successfully!");
         fetchDashboards();
        }catch(err){
          setMessage(err.response.data);
          setMessageType('error');
          
    
        }
    setAddOpen(false);
     
  };
  const handleEdit = async (d) => {
   
    try{
         await AxiosInstance.put(`/dashboard/${d.id}`, d);
         setMessageType('success');
         setMessage("Dashboard Updated successfully!");
         fetchDashboards();
        }catch(err){
          setMessage(err.response.data);
          setMessageType('error');
          
    
        }
    setEditOpen(false);

  };
  const handleDelete = async (id) => {
    
    try{
          if (!window.confirm("Are you sure you want to delete this dashboard?")) return;
         await AxiosInstance.delete(`/dashboard/${id}`);
         setMessageType('success');
         setMessage("Dashboard Deleted successfully!");
         fetchDashboards();
        }catch(err){
          setMessage(err.response.data);
          setMessageType('error');
          
    
        }
    

  };
  const handleView = (id) => history.push(`/admin/dashboardView/${id}`);

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

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Dashboards List</h3>
        <button
          onClick={() => setAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add Dashboard
        </button>
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            setName("");
            setDescription("");
            setBaseUrl("");
            setSecretKey("");
            setResourceValue("");
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

      {/* Collapsible Filters */}
      {showFilters && (
        <div className="bg-white p-6 shadow rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Base URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Base URL
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Secret Key */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Secret Key
            </label>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* ResourceValue */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dashboard ID
            </label>
            <input
              type="number"
              value={resourceValue}
              onChange={(e) => setResourceValue(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
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

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Description",
                "Base URL",
                "Secret Key",
                "Dashboard ID",
                "Created At",
                "Actions",
              ].map((h) => (
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
            {dashboards.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setDetailOpen(true) || setSelected(d)}
              >
                <td className="px-6 py-4 text-sm">{d.name}</td>
                <td className="px-6 py-4 text-sm">{d.description}</td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={d.base_url}
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-500 hover:underline"
                  >
                    {d.base_url}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm">{d.secret_key.substr(0,10)}...</td>
                <td className="px-6 py-4 text-sm">{d.resourceValue}</td>
                <td className="px-6 py-4 text-sm">{d.created_at}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button onClick={(e) => { e.stopPropagation(); handleView(d.id); }}>
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(d);
                      setEditOpen(true);
                    }}
                  >
                    <FaEdit className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(d.id);
                    }}
                  >
                    <FaTrash className="text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Detail Modal */}
      <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)}>
        {selected && (
          <div>
            <h4 className="text-lg font-semibold mb-4">{selected.name}</h4>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Base URL:</strong> {selected.base_url}</p>
            <p><strong>Secret Key:</strong> {selected.secret_key}</p>
            <p><strong>Dashboard ID:</strong> {selected.resourceValue}</p>
            <p><strong>Created By:</strong> {selected.created_by}</p>
            <p><strong>Created At:</strong> {selected.created_at}</p>
          </div>
        )}
      </Modal>

      {/* Add/Edit Modals */}
      <AddDashboardModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditDashboardModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        dashboard={selected}
      />
    </div>
  );
}
