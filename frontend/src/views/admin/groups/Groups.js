import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";
import AxiosInstance from "../../../Axios";
import Modal from "../../../components/Modal";
import AddGroupModal from "./AddGroupModal";
import EditGroupModal from "./EditGroupModal";

export default function GroupsList() {
  // data + pagination
  const [groups, setGroups] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // modals
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // filters
  const [showFilters, setShowFilters] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [filterAuthority, setFilterAuthority] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [updatedAfter, setUpdatedAfter] = useState("");
  const [updatedBefore, setUpdatedBefore] = useState("");

  // helper → ISO
  const toISO = (v) => {
    const d = new Date(v);
    return isNaN(d) ? undefined : d.toISOString().slice(0, -1);
  };

  // build params
  const buildParams = () => ({
    ...(searchName && { name: searchName }),
    ...(searchDesc && { description: searchDesc }),
    ...(filterAuthority && { authority: filterAuthority }),
    ...(createdAfter && { createdAfter: toISO(createdAfter) }),
    ...(createdBefore && { createdBefore: toISO(createdBefore) }),
    ...(updatedAfter && { updatedAfter: toISO(updatedAfter) }),
    ...(updatedBefore && { updatedBefore: toISO(updatedBefore) }),
    pageNumber,
    pageSize,
  });



// fetch function
 const fetchData = async () => {
    try {
      const res = await AxiosInstance.get("groups", {
        params: buildParams(),
      });
      setGroups(res.data.content);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      console.error(e);
    }
  };

useEffect(() => {
 
  fetchData();
}, [
  pageNumber,
  searchName,
  searchDesc,
  filterAuthority,
  createdAfter,
  createdBefore,
  updatedAfter,
  updatedBefore,
]);
  // actions
  const handleAdd = async (g) => {
    await AxiosInstance.post("groups", g);
    setIsAddOpen(false);
    fetchData();
  };
  const handleEdit = async (g) => {
    await AxiosInstance.put(`groups/${g.id}`, g);
    setIsEditOpen(false);
    fetchData();
  };
  const handleDelete = async (id) => {
    await AxiosInstance.delete(`groups/${id}`);
    fetchData();
  };

  const goTo = (n) => setPageNumber(Math.max(0, Math.min(n, totalPages - 1)));

// collect all authorities for dropdown (guard against undefined)
const allAuth = Array.from(
  new Set(
    groups.flatMap((g) => g.authoritesList ?? [])
  )
);

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Groups List</h3>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add Group
        </button>
      </div>

      {/* search + filter toggle */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
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
            setSearchName("");
            setSearchDesc("");
            setFilterAuthority("");
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
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              type="text"
              value={searchDesc}
              onChange={(e) => setSearchDesc(e.target.value)}
              className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500"
            />
          </div>
          {/* Authority */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Authority
            </label>
            <select
              value={filterAuthority}
              onChange={(e) => setFilterAuthority(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-indigo-500 appearance-none"
            >
              <option value="">All Authorities</option>
              {allAuth.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
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
              {["Name", "Description", "Authorities", "Actions"].map((h) => (
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
            {groups.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{g.name}</td>
                <td className="px-6 py-4 text-sm">{g.description}</td>
                <td className="px-6 py-4 text-sm">{g.authoritesList.join(", ")}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => {
                      setSelectedGroup(g);
                      setIsEditOpen(true);
                    }}
                  >
                    <FaEdit className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(g.id)}>
                    <FaTrash className="text-red-600 hover:text-red-800" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGroup(g);
                      setIsDetailOpen(true);
                    }}
                  >
                    Details
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
              pageNumber === i
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
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
        {selectedGroup && (
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {selectedGroup.name}
            </h4>
            <p>
              <strong>Description:</strong> {selectedGroup.description}
            </p>
            <p>
              <strong>Authorities:</strong>{" "}
              {selectedGroup.authoritesList.join(", ")}
            </p>
          </div>
        )}
      </Modal>

      {/* add/edit */}
      <AddGroupModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />
      <EditGroupModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEdit}
        group={selectedGroup}
      />
    </div>
  );
}
