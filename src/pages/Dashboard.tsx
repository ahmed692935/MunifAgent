// // src/pages/Dashboard.tsx
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Agent from "../assets/Images/Agent.png";
// import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
// import { useEffect, useState } from "react";
// import EditAgentModal from "../components/EditAgentModal";
// import type { AgentType, AnalyticsData } from "../Interface/AddAgent";

// import {
//   getAnalyticsDashboard,
//   getAllAgents,
//   deleteAgent,
//   searchAgentsByOwner,
// } from "../api/api";
// import toast from "react-hot-toast";
// import type { AxiosError } from "axios";

// const Dashboard = () => {
//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
//   const navigate = useNavigate();
//   const [deletingId, setDeletingId] = useState<number | null>(null);

//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState<AgentType[]>([]);
//   // const searchRef = useRef<HTMLDivElement | null>(null);

//   const handleSearch = async () => {
//     const token = localStorage.getItem("token");
//     if (!token || !searchText.trim()) return;

//     try {
//       const res = await searchAgentsByOwner(token, searchText.trim());
//       setSearchResults(res?.agents || []);
//     } catch (err) {
//       console.log("Search error:", err);
//       setSearchResults([]);
//     }
//   };

//   const scrollToCard = (id: number) => {
//     const element = document.getElementById(`agent-card-${id}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   // const [analytics, setAnalytics] = useState<any>(null);
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

//   // const [apiAgents, setApiAgents] = useState<any[]>([]);
//   const [apiAgents, setApiAgents] = useState<AgentType[]>([]);

//   const [agentLoading, setAgentLoading] = useState(true);

//   // Dynamic pagination
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);

//   const handleDeleteAgent = async (id: number) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     setDeletingId(id);

//     try {
//       const response = await deleteAgent(token, id); // call API
//       setApiAgents((prev) => prev.filter((a) => a.id !== id));
//       toast.success(response?.message || "Agent deleted successfully");
//       await reloadAgents();
//     } catch (err: unknown) {
//       const error = err as AxiosError<{ error: string }>;
//       toast.error(error?.response?.data?.error || "Failed to delete agent");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         // Set loading states
//         // setLoading(true);
//         setAgentLoading(true);

//         // Parallel API calls
//         const [analyticsRes, agentsRes] = await Promise.all([
//           getAnalyticsDashboard(token),
//           getAllAgents(token, page, pageSize),
//         ]);

//         // Set data
//         setAnalytics(analyticsRes.data);

//         const agentsData = agentsRes?.data?.agents || [];
//         setApiAgents(agentsData);

//         setPage(agentsRes?.data?.page || 1);
//         setPageSize(agentsRes?.data?.page_size || 5);
//         setTotalPages(agentsRes?.data?.total_pages || 1);
//       } catch (err) {
//         console.error("Dashboard Error:", err);
//       } finally {
//         // setLoading(false);
//         setAgentLoading(false);
//       }
//     };

//     fetchData();
//   }, [page, pageSize]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage((prev) => prev + 1);
//   };

//   const reloadAgents = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const agentsRes = await getAllAgents(token, page, pageSize);
//       setApiAgents(agentsRes?.data?.agents || []);
//     } catch (error) {
//       console.error("Reload Agents Error", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className=" container mx-auto mt-28">
//         {/* ---------- Top Analytics ---------- */}
//         <div className="grid md:grid-cols-2 gap-4 mb-8 px-2 lg:px-20">
//           <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
//             <h3 className="text-xl font-semibold">Total Calls Received</h3>
//             <p className="text-3xl font-bold mt-2">
//               {analytics?.total_calls ?? 0}
//             </p>
//           </div>

//           <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
//             <h3 className="text-xl font-semibold">Total Agents</h3>
//             <p className="text-3xl font-bold mt-2">
//               {analytics?.total_agents ?? 0}
//             </p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="px-2 lg:px-20 mb-6">
//           {/* <input
//             type="text"
//             placeholder="Search by owner name..."
//             className="w-full border px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#3d4b52]"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           /> */}
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search by owner name..."
//               className="w-full border px-4 py-3 pr-12 rounded-xl shadow-sm focus:ring-0 focus:ring-[#3d4b52"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />

//             {/* Search Icon */}
//             <button
//               onClick={handleSearch}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#3d4b52] cursor-pointer"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Search Results Dropdown */}
//           {searchResults.length > 0 && (
//             <div className="mt-2 bg-white shadow-lg rounded-xl border max-h-64 overflow-y-auto">
//               {searchResults.map((agent) => (
//                 <div
//                   key={agent.id}
//                   className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                   // onClick={() => {
//                   //   scrollToCard(agent.id);
//                   //   setSearchResults([]);
//                   // }}
//                   onClick={async () => {
//                     setSearchResults([]);

//                     // 1. Find which page has this agent
//                     const token = localStorage.getItem("token");
//                     if (!token) return;

//                     try {
//                       let foundPage = null;

//                       // Loop through all pages to find where this agent exists
//                       for (let p = 1; p <= totalPages; p++) {
//                         const res = await getAllAgents(token, p, pageSize);
//                         const agents = res?.data?.agents || [];

//                         if (agents.some((a: AgentType) => a.id === agent.id)) {
//                           foundPage = p;
//                           break;
//                         }
//                       }

//                       if (foundPage) {
//                         setPage(foundPage);

//                         setTimeout(() => {
//                           scrollToCard(agent.id);
//                         }, 500);
//                       }
//                     } catch (error) {
//                       console.log("Could not locate agent:", error);
//                     }
//                   }}
//                 >
//                   <span>{agent.owner_name}</span>
//                   <span className="text-sm text-gray-500">
//                     {agent.agent_name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ---------- Agent Cards ---------- */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-20 mt-12">
//           {agentLoading ? (
//             <div className="flex justify-center col-span-3 mt-10">
//               <div className="w-12 h-12 border-4 border-t-[#3d4b52] border-gray-200 rounded-full animate-spin"></div>
//             </div>
//           ) : apiAgents.length === 0 ? (
//             <p className="text-center col-span-3 mt-10">No agents found</p>
//           ) : (
//             apiAgents.map((agent) => (
//               <div
//                 key={agent.id}
//                 id={`agent-card-${agent.id}`}
//                 className="bg-white shadow-lg rounded-2xl p-5 border-1 hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
//               >
//                 {/* Top Row: Image + Name/Phone */}
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={agent.avatar_presigned_url || Agent}
//                       alt="Agent Image"
//                       className="w-16 h-16 rounded-full object-cover border-2 border-white"
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold">
//                         {agent.agent_name}
//                       </h3>
//                       <p className="text-sm text-[#3d4b52]">
//                         {agent.phone_number}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-1">
//                     {/* <MdOutlineModeEdit className="hover:text-[#3d4b52] hover:underline" />
//                      */}
//                     <MdOutlineModeEdit
//                       className="hover:text-[#3d4b52] hover:underline cursor-pointer"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedAgent(agent);
//                         setEditOpen(true);
//                       }}
//                     />

//                     {deletingId === agent.id ? (
//                       <div className="w-5 h-5 border-2 border-t-red-600 border-gray-300 rounded-full animate-spin"></div>
//                     ) : (
//                       <MdDeleteOutline
//                         className="hover:text-red-600 cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteAgent(agent.id);
//                         }}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* Business Name */}
//                 <p className="mt-3 text-[#3d4b52] font-medium">
//                   {agent.owner_name}
//                 </p>

//                 {/* Prompt (truncate to 2 lines) */}
//                 <p className="mt-2 text-sm text-[#3d4b52] line-clamp-2">
//                   {agent.system_prompt ||
//                     "This agent is highly experienced and dedicated to providing the best service possible."}
//                 </p>

//                 {/* See More Button */}
//                 <button
//                   className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42] cursor-pointer transition"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/agent/${agent.id}`);
//                   }}
//                 >
//                   See More
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="flex justify-center mt-8 gap-4">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
//             onClick={handlePrevPage}
//             disabled={page === 1}
//           >
//             Prev
//           </button>
//           <span className="px-3 py-2">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
//             onClick={handleNextPage}
//             disabled={page === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       <EditAgentModal
//         open={editOpen}
//         onClose={() => setEditOpen(false)}
//         data={selectedAgent}
//         // onSave={(updatedData) => {
//         //   console.log("Updated:", updatedData);
//         // }}
//         onSave={() => {
//           reloadAgents();
//         }}
//       />
//     </>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Agent from "../assets/Images/Agent.png";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import EditAgentModal from "../components/EditAgentModal";
import type { AgentType, AnalyticsData } from "../Interface/AddAgent";
import { IoMdSearch } from "react-icons/io";

import {
  getAnalyticsDashboard,
  getAllAgents,
  deleteAgent,
  searchAgentsByOwner,
} from "../api/api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const Dashboard = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<AgentType[]>([]);
  const [isSearchingMode, setIsSearchingMode] = useState(false);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    if (!token || !searchText.trim()) {
      setIsSearchingMode(false);
      setSearchResults([]);
      return;
    }

    try {
      const res = await searchAgentsByOwner(token, searchText.trim());

      if (res?.count === 0) {
        setSearchResults([]);
        setIsSearchingMode(true);
        return;
      }

      setSearchResults(res?.data || []);
      setIsSearchingMode(true);
    } catch (err) {
      console.log("Search error:", err);
      setSearchResults([]);
      setIsSearchingMode(true);
    }
  };

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [apiAgents, setApiAgents] = useState<AgentType[]>([]);
  const [agentLoading, setAgentLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const handleDeleteAgent = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setDeletingId(id);

    try {
      const response = await deleteAgent(token, id);
      setApiAgents((prev) => prev.filter((a) => a.id !== id));
      toast.success(response?.message || "Agent deleted successfully");
      await reloadAgents();
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to delete agent");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (isSearchingMode) return; // stop fetching when user is searching

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setAgentLoading(true);

        const [analyticsRes, agentsRes] = await Promise.all([
          getAnalyticsDashboard(token),
          getAllAgents(token, page, pageSize),
        ]);

        setAnalytics(analyticsRes.data);

        const agentsData = agentsRes?.data?.agents || [];
        setApiAgents(agentsData);

        setPage(agentsRes?.data?.page || 1);
        setPageSize(agentsRes?.data?.page_size || 5);
        setTotalPages(agentsRes?.data?.total_pages || 1);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setAgentLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, isSearchingMode]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const reloadAgents = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const agentsRes = await getAllAgents(token, page, pageSize);
      setApiAgents(agentsRes?.data?.agents || []);
    } catch (error) {
      console.error("Reload Agents Error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" container mx-auto mt-28">
        {/* ---------- Top Analytics ---------- */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 px-2 lg:px-20">
          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Calls Received</h3>
            <p className="text-3xl font-bold mt-2">
              {analytics?.total_calls ?? 0}
            </p>
          </div>

          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Agents</h3>
            <p className="text-3xl font-bold mt-2">
              {analytics?.total_agents ?? 0}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-2 lg:px-20 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by owner name..."
              className="w-full border px-4 py-3 pr-12 rounded-xl shadow-sm focus:ring-0"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (e.target.value.trim() === "") {
                  setIsSearchingMode(false);
                  setSearchResults([]);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#3d4b52] cursor-pointer"
            >
              {/* 🔍 */}
              <IoMdSearch size={25} />
            </button>
          </div>
        </div>

        {/* SEARCH MODE UI */}
        {isSearchingMode && (
          <div className="px-2 lg:px-20">
            {searchResults.length === 0 ? (
              <p className="text-center text-[#3d4b52] mt-10 text-xl font-semibold">
                No Business Owner Found
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {searchResults.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white shadow-lg rounded-2xl p-5 border-1 hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={agent.avatar_presigned_url || Agent}
                          alt="Agent Image"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">
                            {agent.agent_name}
                          </h3>
                          <p className="text-sm">{agent.phone_number}</p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <MdOutlineModeEdit
                          className="hover:text-[#3d4b52] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAgent(agent);
                            setEditOpen(true);
                          }}
                        />
                        <MdDeleteOutline
                          className="hover:text-red-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agent.id);
                          }}
                        />
                      </div>
                    </div>

                    <p className="mt-3 font-medium">{agent.owner_name}</p>

                    <p className="mt-2 text-sm line-clamp-2">
                      {agent.system_prompt ||
                        "This agent is highly experienced and dedicated to providing the best service possible."}
                    </p>

                    <button
                      className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/agent/${agent.id}`);
                      }}
                    >
                      See More
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAGINATION MODE UI */}
        {!isSearchingMode && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-20 mt-12">
              {agentLoading ? (
                <div className="flex justify-center col-span-3 mt-10">
                  <div className="w-12 h-12 border-4 border-t-[#3d4b52] border-gray-200 rounded-full animate-spin"></div>
                </div>
              ) : apiAgents.length === 0 ? (
                <p className="text-center col-span-3 mt-10">No agents found</p>
              ) : (
                apiAgents.map((agent) => (
                  <div
                    key={agent.id}
                    id={`agent-card-${agent.id}`}
                    className="bg-white shadow-lg rounded-2xl p-5 border-1 hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={agent.avatar_presigned_url || Agent}
                          alt="Agent Image"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">
                            {agent.agent_name}
                          </h3>
                          <p className="text-sm text-[#3d4b52]">
                            {agent.phone_number}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <MdOutlineModeEdit
                          className="hover:text-[#3d4b52] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAgent(agent);
                            setEditOpen(true);
                          }}
                        />

                        {deletingId === agent.id ? (
                          <div className="w-5 h-5 border-2 border-t-red-600 border-gray-300 rounded-full animate-spin"></div>
                        ) : (
                          <MdDeleteOutline
                            className="hover:text-red-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAgent(agent.id);
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <p className="mt-3 font-medium">{agent.owner_name}</p>

                    <p className="mt-2 text-sm line-clamp-2">
                      {agent.system_prompt ||
                        "This agent is highly experienced and dedicated to providing the best service possible."}
                    </p>

                    <button
                      className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42]"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/agent/${agent.id}`);
                      }}
                    >
                      See More
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="px-3 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <EditAgentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={selectedAgent}
        onSave={() => {
          reloadAgents();
        }}
      />
    </>
  );
};

export default Dashboard;
