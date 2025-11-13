// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy data — replace with API call later
  const agents = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1 234 567 890",
      business: "Tech Solutions",
    },
    {
      id: 2,
      name: "Sarah Khan",
      phone: "+92 300 1234567",
      business: "SkyLine Marketing",
    },
    {
      id: 3,
      name: "Ali Raza",
      phone: "+92 333 9876543",
      business: "Alpha Connect",
    },
  ];

  const totalCalls = 120;
  const totalAgents = agents.length;

  return (
    <div className="p-6">
      {/* ---------- Top Analytics ---------- */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Calls Received</h3>
          <p className="text-3xl font-bold mt-2">{totalCalls}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Agents</h3>
          <p className="text-3xl font-bold mt-2">{totalAgents}</p>
        </div>
      </div>

      {/* ---------- Agent Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/agent/${agent.id}`)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {agent.name}
            </h3>
            <p className="text-gray-600 mt-1">{agent.phone}</p>
            <p className="text-gray-500 text-sm">{agent.business}</p>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
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
  );
};

export default Dashboard;
