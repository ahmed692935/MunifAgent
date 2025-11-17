// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Agent from "../assets/Images/Agent.png";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import EditAgentModal from "../components/EditAgentModal";
import type { AgentType } from "../Interface/AddAgent";

import { getAnalyticsDashboard, getAllAgents } from "../api/api"; // your API function

const Dashboard = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const navigate = useNavigate();

  // Dummy data — replace with API call later
  // const agents = [
  //   {
  //     id: 1,
  //     image: "",
  //     name: "John Doe",
  //     phone: "+1 234 567 890",
  //     business: "Tech Solutions",
  //     prompt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  //   {
  //     id: 2,
  //     image: "",
  //     name: "Sarah Khan",
  //     phone: "+92 300 1234567",
  //     business: "SkyLine Marketing",
  //     prompt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  //   {
  //     id: 3,
  //     image: "",
  //     name: "Ali Raza",
  //     phone: "+92 333 9876543",
  //     business: "Alpha Connect",
  //     prompt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  // ];

  // const totalCalls = 120;
  // const totalAgents = agents.length;

  const [analytics, setAnalytics] = useState<any>(null);
  // const [loading, setLoading] = useState(true);


  const [apiAgents, setApiAgents] = useState<any[]>([]);
  const [agentLoading, setAgentLoading] = useState(true);

  // Dynamic pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);


  // useEffect(() => {
  //   const fetchAnalytics = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // or wherever stored
  //       if (!token) return;

  //       const res = await getAnalyticsDashboard(token);
  //       setAnalytics(res.data);
  //     } catch (err) {
  //       console.error("Analytics Error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnalytics();
  // }, [getAnalyticsDashboard]);

  // if (loading) {
  //   return <p className="text-center mt-40">Loading Dashboard...</p>;
  // }


  // useEffect(() => {
  //   const fetchAgents = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;

  //       const res = await getAllAgents(token);

  //       console.log("Agents:", res?.data?.agents);
  //       setApiAgents(res?.data?.agents || []);
  //     } catch (err) {
  //       console.error("Agents Error:", err);
  //     } finally {
  //       setAgentLoading(false);
  //     }
  //   };

  //   fetchAgents();
  // }, [getAllAgents]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Set loading states
        // setLoading(true);
        setAgentLoading(true);

        // Parallel API calls
        const [analyticsRes, agentsRes] = await Promise.all([
          getAnalyticsDashboard(token),
          getAllAgents(token, page, pageSize),
        ]);

        // Set data
        setAnalytics(analyticsRes.data);

        const agentsData = agentsRes?.data?.agents || [];
        setApiAgents(agentsData);

        // Set dynamic pagination from API response
        setPage(agentsRes?.data?.page || 1);
        setPageSize(agentsRes?.data?.page_size || 5);
        setTotalPages(agentsRes?.data?.total_pages || 1);

      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        // setLoading(false);
        setAgentLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);


  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };



  // if (loading) {
  //   return <p className="text-center mt-40">Loading Dashboard...</p>;
  // }

  return (
    <>
      <Navbar />
      <div className=" container mx-auto mt-28">
        {/* ---------- Top Analytics ---------- */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 px-2 lg:px-20">
          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Calls Received</h3>
            <p className="text-3xl font-bold mt-2">{analytics?.total_calls ?? 0}</p>
          </div>

          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Agents</h3>
            <p className="text-3xl font-bold mt-2">
              {analytics?.total_agents ?? 0}
            </p>
          </div>
        </div>

        {/* ---------- Agent Cards ---------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-20 mt-12">
          {agentLoading ? (
            <div className="flex justify-center col-span-3 mt-10">
              <div className="w-12 h-12 border-4 border-t-[#3d4b52] border-gray-200 rounded-full animate-spin"></div>
            </div>
          ) :
            apiAgents.length === 0 ? (
              <p className="text-center col-span-3 mt-10">No agents found</p>
            ) : (

              apiAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white shadow-lg rounded-2xl p-5 border-1 hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
                >
                  {/* Top Row: Image + Name/Phone */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={agent.avatar_url || Agent}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{agent.agent_name}</h3>
                        <p className="text-sm text-[#3d4b52]">{agent.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {/* <MdOutlineModeEdit className="hover:text-[#3d4b52] hover:underline" />
                   */}
                      <MdOutlineModeEdit
                        className="hover:text-[#3d4b52] hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgent(agent);
                          setEditOpen(true);
                        }}
                      />

                      <MdDeleteOutline className="hover:text-red-600" />
                    </div>
                  </div>

                  {/* Business Name */}
                  <p className="mt-3 text-[#3d4b52] font-medium">
                    {agent.owner_name}
                  </p>

                  {/* Prompt (truncate to 2 lines) */}
                  <p className="mt-2 text-sm text-[#3d4b52] line-clamp-2">
                    {agent.system_prompt ||
                      "This agent is highly experienced and dedicated to providing the best service possible."}
                  </p>

                  {/* See More Button */}
                  <button
                    className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42] cursor-pointer transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/agent/${agent.id}`);
                    }}
                  >
                    See More
                  </button>
                </div>
              )))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-3 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>


      </div>
      <EditAgentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={selectedAgent}
        onSave={(updatedData) => {
          console.log("Updated:", updatedData);
        }}
      />
    </>
  );
};

export default Dashboard;
