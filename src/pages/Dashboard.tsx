// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Agent from "../assets/Images/Agent.png";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy data — replace with API call later
  const agents = [
    {
      id: 1,
      image: "",
      name: "John Doe",
      phone: "+1 234 567 890",
      business: "Tech Solutions",
      prompt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      image: "",
      name: "Sarah Khan",
      phone: "+92 300 1234567",
      business: "SkyLine Marketing",
      prompt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      image: "",
      name: "Ali Raza",
      phone: "+92 333 9876543",
      business: "Alpha Connect",
      prompt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  const totalCalls = 120;
  const totalAgents = agents.length;

  return (
    <>
      <Navbar />
      <div className=" container mx-auto mt-28">
        {/* ---------- Top Analytics ---------- */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 px-2 lg:px-20">
          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Calls Received</h3>
            <p className="text-3xl font-bold mt-2">{totalCalls}</p>
          </div>

          <div className="bg-white border-1 text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
            <h3 className="text-xl font-semibold">Total Agents</h3>
            <p className="text-3xl font-bold mt-2">{totalAgents}</p>
          </div>
        </div>

        {/* ---------- Agent Cards ---------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-20 mt-12">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white shadow-lg rounded-2xl p-5 border-1 hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
              onClick={() => navigate(`/agent/${agent.id}`)}
            >
              {/* Top Row: Image + Name/Phone */}
              <div className="flex items-center gap-4">
                <img
                  src={agent.image || Agent}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="text-sm text-[#3d4b52]">{agent.phone}</p>
                </div>
              </div>

              {/* Business Name */}
              <p className="mt-3 text-[#3d4b52] font-medium">
                {agent.business}
              </p>

              {/* Prompt (truncate to 2 lines) */}
              <p className="mt-2 text-sm text-[#3d4b52] line-clamp-2">
                {agent.prompt ||
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
