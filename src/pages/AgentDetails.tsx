// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import type { Agent, CallLog } from "../Interface/AgentDetails";
// import AgentImg from "../assets/Images/Agent.png";

// const AgentDetails = () => {
//   const { id } = useParams();

//   // Hardcoded Agent Data
//   const agent: Agent = {
//     id: Number(id),
//     phone_number: "+19123965864",
//     agent_name: "CarInfoAgentDE",
//     system_prompt:
//       "You are a professional AI assistant in the car industry. Rules of talking: Greet callers warmly in German, listen carefully, provide accurate car information including models, prices, features, and recommendations. Be polite, concise, patient, and ask clarifying questions if needed. Maintain a friendly tone and end calls appropriately.",
//     voice_type: "female",
//     language: "de",
//     industry: "cars",
//     is_active: true,
//     owner_name: "Hadi",
//     total_calls: 10,
//     completed_calls: 6,
//     unanswered_calls: 4,
//     avg_duration: 35,
//   };

//   // Hardcoded Calls
//   const calls: CallLog[] = [
//     {
//       id: 1,
//       created_at: "2025-11-13 10:00:00",
//       ended_at: "2025-11-13 10:05:00",
//       transcript: "Hello, how can I help you with your car today?",
//       recording_url:
//         "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     },
//     {
//       id: 2,
//       created_at: "2025-11-14 12:15:00",
//       ended_at: "2025-11-14 12:25:00",
//       transcript: "Good afternoon! Let me check the car price for you.",
//       recording_url:
//         "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//     },
//   ];

//   const [openTranscript, setOpenTranscript] = useState<string | null>(null);
//   const [openRecording, setOpenRecording] = useState<string | null>(null);

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-5xl mx-auto">
//         <div className="md:flex justify-between items-end">
//           {/* Agent Header */}
//           <h1 className="text-3xl font-semibold text-[#3d4b52] mb-6 mt-24">
//             Agent Details —{" "}
//             <span className="font-normal text-2xl">{agent.agent_name}</span>
//           </h1>
//           <div>
//             <img
//               src={AgentImg}
//               alt="Agent Image"
//               className="h-20 w-20 rounded-full"
//             />
//           </div>
//         </div>

//         {/* Agent Info Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl">
//           <h2 className="text-lg font-bold mb-4 text-[#3d4b52]">Agent Info</h2>
//           <div className="grid sm:grid-cols-2 gap-4 text-[#3d4b52]">
//             <p>
//               <strong>Name:</strong> {agent.agent_name}
//             </p>
//             <p>
//               <strong>Phone:</strong> {agent.phone_number}
//             </p>
//             <p>
//               <strong>Language:</strong> {agent.language}
//             </p>
//             <p>
//               <strong>Voice Type:</strong> {agent.voice_type}
//             </p>
//             <p>
//               <strong>Industry:</strong> {agent.industry}
//             </p>
//             <p>
//               <strong>Owner:</strong> {agent.owner_name}
//             </p>
//           </div>
//           <div className="mt-4">
//             <strong className="text-[#3d4b52] text-lg">System Prompt:</strong>
//             <p className="mt-1 text-gray-600 whitespace-pre-line">
//               {agent.system_prompt}
//             </p>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
//             <p className="text-2xl font-bold">{agent.total_calls}</p>
//             <p className="text-gray-600 text-sm">Total Calls</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
//             <p className="text-2xl font-bold">{agent.completed_calls}</p>
//             <p className="text-gray-600 text-sm">Completed</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
//             <p className="text-2xl font-bold">{agent.unanswered_calls}</p>
//             <p className="text-gray-600 text-sm">Unanswered</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
//             <p className="text-2xl font-bold">{agent.avg_duration}s</p>
//             <p className="text-gray-600 text-sm">Avg Duration</p>
//           </div>
//         </div>

//         {/* Calls Table */}
//         {/* Calls Table */}
//         <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Call History
//           </h2>

//           {/* Scrollable wrapper */}
//           <div className="overflow-x-auto rounded-t-xl">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-[#3d4b52] text-white text-left">
//                   <th className="p-3">Date</th>
//                   <th className="p-3">Ended At</th>
//                   <th className="p-3">Transcript</th>
//                   <th className="p-3">Recording</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {calls.map((call) => (
//                   <tr key={call.id} className="border-b border-gray-300">
//                     <td className="p-3">{call.created_at}</td>
//                     <td className="p-3">{call.ended_at || "N/A"}</td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => setOpenTranscript(call.transcript)}
//                         className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
//                       >
//                         View
//                       </button>
//                     </td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => setOpenRecording(call.recording_url)}
//                         className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
//                       >
//                         Play
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Transcript Modal */}
//         {openTranscript && (
//           <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
//               <h3 className="text-lg font-semibold mb-2">Transcript</h3>
//               <p className="text-gray-700 whitespace-pre-line">
//                 {openTranscript}
//               </p>
//               <button
//                 onClick={() => setOpenTranscript(null)}
//                 className="mt-4 w-full bg-[#3d4b52] text-white py-2 rounded-lg cursor-pointer"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Recording Modal */}
//         {openRecording && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-xl w-96 shadow-xl ">
//               <h3 className="text-lg font-semibold mb-2">Recording</h3>
//               <audio controls className="w-full">
//                 <source src={openRecording} type="audio/mpeg" />
//               </audio>
//               <button
//                 onClick={() => setOpenRecording(null)}
//                 className="mt-4 w-full bg-[#3d4b52] text-white py-2 rounded-lg cursor-pointer"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AgentDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { Agent, CallLog } from "../Interface/AgentDetails";
import AgentImg from "../assets/Images/Agent.png";
import { getAgentById } from "../api/api";

const AgentDetails = () => {
  const { id } = useParams();

  const [agent, setAgent] = useState<Agent | null>(null);
  console.log(agent, "AAAAAAAAAKKKK");
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  const [openTranscript, setOpenTranscript] = useState<string | null>(null);
  const [openRecording, setOpenRecording] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !id) return;

        // API CALL #1 — Fetch Agent Details
        const agentRes = await getAgentById(token, id);
        // setAgent(agentRes.data.data || agentRes.data.call_stats);
        const agentData = agentRes.data.data;
        setAgent(agentData);

        const callData: CallLog[] = agentData.calls?.data || [];
        setCalls(callData);
      } catch (err) {
        console.error("Agent Details Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-40">Loading Agent Details...</p>;
  }

  if (!agent) {
    return <p className="text-center mt-40 text-red-500">Agent not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="md:flex justify-between items-end">
          {/* Agent Header */}
          <h1 className="text-3xl font-semibold text-[#3d4b52] mb-6 mt-24">
            Agent Details —{" "}
            <span className="font-normal text-2xl">{agent?.agent_name}</span>
          </h1>
          <div>
            <img
              // src={AgentImg}
              src={agent?.avatar_url || AgentImg}
              alt="Agent Image"
              className="h-20 w-20 rounded-full"
            />
          </div>
        </div>

        {/* Agent Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl">
          <h2 className="text-lg font-bold mb-4 text-[#3d4b52]">Agent Info</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-[#3d4b52]">
            <p>
              <strong>Name:</strong> {agent?.agent_name}
            </p>
            <p>
              <strong>Phone:</strong> {agent?.phone_number}
            </p>
            <p>
              <strong>Language:</strong> {agent?.language}
            </p>
            <p>
              <strong>Voice Type:</strong> {agent?.voice_type}
            </p>
            <p>
              <strong>Industry:</strong> {agent?.industry}
            </p>
            <p>
              <strong>Owner:</strong> {agent?.owner_name}
            </p>
          </div>
          <div className="mt-4">
            <strong className="text-[#3d4b52] text-lg">System Prompt:</strong>
            <p className="mt-1 text-gray-600 whitespace-pre-line">
              {agent?.system_prompt}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.total_calls}
            </p>
            <p className="text-gray-600 text-sm">Total Calls</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.completed_calls}
            </p>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.unanswered_calls}
            </p>
            <p className="text-gray-600 text-sm">Unanswered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.avg_duration}s
            </p>
            <p className="text-gray-600 text-sm">Avg Duration</p>
          </div>
        </div>

        {/* Calls Table */}
        {/* Calls Table */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Call History
          </h2>

          {/* Scrollable wrapper */}
          <div className="overflow-x-auto rounded-t-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#3d4b52] text-white text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Ended At</th>
                  <th className="p-3">Transcript</th>
                  <th className="p-3">Recording</th>
                </tr>
              </thead>
              {/* <tbody>
                {calls.map((call) => (
                  <tr key={call.id} className="border-b border-gray-300">
                    <td className="p-3">{call.created_at}</td>
                    <td className="p-3">{call.ended_at || "N/A"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setOpenTranscript(call.transcript)}
                        className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setOpenRecording(call.recording_url)}
                        className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
                      >
                        Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}
              <tbody>
                {calls.length > 0 ? (
                  calls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-300">
                      <td className="p-3">{call.created_at}</td>
                      <td className="p-3">{call.ended_at || "N/A"}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setOpenTranscript(call.transcript)}
                          className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setOpenRecording(call.recording_url)}
                          className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
                        >
                          Play
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-3 text-gray-500">
                      No call history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transcript Modal */}
        {openTranscript && (
          <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Transcript</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {openTranscript}
              </p>
              <button
                onClick={() => setOpenTranscript(null)}
                className="mt-4 w-full bg-[#3d4b52] text-white py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Recording Modal */}
        {openRecording && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl ">
              <h3 className="text-lg font-semibold mb-2">Recording</h3>
              <audio controls className="w-full">
                <source src={openRecording} type="audio/mpeg" />
              </audio>
              <button
                onClick={() => setOpenRecording(null)}
                className="mt-4 w-full bg-[#3d4b52] text-white py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentDetails;
