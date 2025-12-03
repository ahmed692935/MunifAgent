import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { Agent, CallLog, TranscriptItem } from "../Interface/AgentDetails";
import AgentImg from "../assets/Images/Agent.png";
import { getAgentById, resetAgentMinutes } from "../api/api";
import toast from "react-hot-toast";
import { FiRotateCw } from "react-icons/fi";

const AgentDetails = () => {
  const { id } = useParams();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openTranscript, setOpenTranscript] = useState<string | null>(null);
  const [transcriptData, setTranscriptData] = useState<string | null>(null);

  const [openRecording, setOpenRecording] = useState<string | null>(null);

  // useEffect(() => {
  const fetchData = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !id) return;

      setLoading(true);

      const agentRes = await getAgentById(token, id, page);
      const agentData = agentRes.data.data;

      setAgent(agentData);

      // const callData: CallLog[] = agentData.calls?.data || []; //old
      const callData = agentData.calls?.data ?? [];
      setCalls(callData);
      setCurrentPage(page);
      setTotalPages(agentData.calls?.total_pages ?? 1);
    } catch (err) {
      console.error("Agent Details Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // fetchData();
  // }, [id]);
  useEffect(() => {
    fetchData(1);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-40">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#3d4b52] rounded-full animate-spin"></div>
        <p className="text-center mt-4 text-[#3d4b52] font-medium">
          Loading Agent Details...
        </p>
      </div>
    );
  }

  if (!agent) {
    return <p className="text-center mt-40 text-red-500">Agent not found.</p>;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    const d = new Date(dateString);
    const datePart = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timePart = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return `${datePart} • ${timePart}`;
  };

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
              src={agent?.avatar_presigned_url || AgentImg}
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
            <p>
              <strong>Allowed Minutes:</strong> {agent?.allowed_minutes} min
            </p>
            <p>
              <strong>Owner Email:</strong> {agent?.owner_email}
            </p>
            <p>
              <strong>Business Hours (Start):</strong>{" "}
              {agent?.business_hours_start}
            </p>
            <p>
              <strong>Business Hours (End):</strong> {agent?.business_hours_end}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
              {/* {agent?.call_stats?.avg_duration} */}
              {Math.floor((agent?.call_stats?.avg_duration ?? 0) / 60)} min
            </p>
            <p className="text-gray-600 text-sm">Avg Duration</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {/* {agent?.call_stats?.total_duration} */}
              {Math.floor((agent?.call_stats?.total_duration ?? 0) / 60)} min
            </p>
            <p className="text-gray-600 text-sm">Total Duration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center text-center hover:shadow-xl border hover:scale-102">
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <strong>First Call:</strong>{" "}
                {agent?.call_stats?.first_call_at
                  ? new Date(agent.call_stats.first_call_at).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )
                  : "N/A"}
              </p>
              <p>
                <strong>Last Call:</strong>{" "}
                {agent?.call_stats?.last_call_at
                  ? new Date(agent.call_stats.last_call_at).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.unanswered_calls}
            </p>
            <p className="text-gray-600 text-sm">Unanswered</p>
          </div> */}
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">{agent?.allowed_minutes}</p>
            <p className="text-gray-600 text-sm">Allowed Minutes</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center hover:shadow-xl border hover:scale-102">
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <strong>Percentage Used:</strong>{" "}
                {agent?.minutes_info?.percentage_used ?? 0}%
              </p>
              <p>
                <strong>Used Mins:</strong>{" "}
                {agent?.minutes_info?.used_minutes ?? 0} min
              </p>
            </div>
          </div>

          <div className="relative bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            {/* Reset icon at top-right */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-[#3d4b52]"
              onClick={async () => {
                const token = localStorage.getItem("token");
                if (!token || !agent?.id) return;

                try {
                  await resetAgentMinutes(token, agent.id);
                  toast.success("Agent Minutes reset successfully!");
                  // Refetch agent to update minutes
                  fetchData(currentPage);
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to reset minutes.");
                }
              }}
            >
              <FiRotateCw size={20} />
            </button>

            <p className="text-2xl font-bold">
              {agent?.minutes_info?.used_minutes ?? 0} min
            </p>
            <p className="text-gray-600 text-sm">Used Minutes</p>
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
              <tbody>
                {calls.length > 0 ? (
                  calls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-300">
                      {/* <td className="p-3">{call.created_at}</td>
                      <td className="p-3">{call.ended_at || "N/A"}</td> */}
                      <td className="p-3">{formatDate(call.created_at)}</td>
                      <td className="p-3">{formatDate(call.ended_at)}</td>

                      {/* <td className="p-3">
                        <button
                          // onClick={() => setOpenTranscript(call.transcript)}
                          onClick={() =>
                            fetchTranscript(call.transcript_presigned_url)
                          }
                          className="text-white bg-[#3d4b52] px-5 py-1 rounded-lg cursor-pointer"
                        >
                          View
                        </button>
                      </td> */}
                      <td className="p-3">
                        <button
                          className="text-white bg-[#3d4b52] hover:bg-[#2d3b42] px-5 py-1 rounded-lg cursor-pointer"
                          onClick={() => {
                            if (!call.transcript || !call.transcript.items)
                              return;
                            // Format transcript from local data
                            const formatted = call.transcript.items
                              .map((i: TranscriptItem) => {
                                if (i.type === "message") {
                                  const role =
                                    i.role === "assistant" ? "Agent" : "User";
                                  return `${role}: ${i.content.join(" ")}`;
                                }
                                return "";
                              })
                              .filter((line: string) => line.trim() !== "")
                              .join("\n\n");
                            setTranscriptData(formatted);
                            setOpenTranscript(call.id.toString());
                          }}
                        >
                          View Transcript
                        </button>
                      </td>

                      <td className="p-3">
                        <button
                          // onClick={() => setOpenRecording(call.recording_url)}
                          onClick={() =>
                            setOpenRecording(call.recording_presigned_url)
                          }
                          className="text-white bg-[#3d4b52] hover:bg-[#2d3b42] px-5 py-1 rounded-lg cursor-pointer"
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

            <div className="flex justify-between items-center mt-4 gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchData(currentPage - 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#3d4b52] text-white hover:bg-[#2d3b42]"
                }`}
              >
                Prev
              </button>

              <span className="px-4 py-2 rounded bg-gray-200">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchData(currentPage + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#3d4b52] text-white hover:bg-[#2d3b42]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Modal */}
        {openTranscript && transcriptData && (
          <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center top-20 p-4">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4 text-center">Transcript</h3>
              <pre className="whitespace-pre-wrap">{transcriptData}</pre>
              <button
                className="mt-4 w-full mt-10 bg-[#3d4b52] hover:bg-[#2d3b42] text-white py-2 rounded-lg cursor-pointer"
                onClick={() => setOpenTranscript(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* {openTranscript && (
          <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Transcript</h3>

              {openTranscript === "loading" ? (
                <p className="text-gray-600">Loading transcript...</p>
              ) : (
                <pre className="text-gray-700 whitespace-pre-wrap">
                  {transcriptData}
                </pre>
              )}

              <button
                onClick={() => {
                  setOpenTranscript(null);
                  setTranscriptData(null);
                }}
                className="mt-4 w-full bg-[#3d4b52] text-white py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )} */}

        {/* Recording Modal */}
        {openRecording && (
          <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl ">
              <h3 className="text-lg font-semibold mb-2">Recording</h3>
              <audio controls autoPlay className="w-full">
                <source src={openRecording} type="audio/ogg" />
              </audio>
              <button
                onClick={() => setOpenRecording(null)}
                className="mt-4 w-full bg-[#3d4b52] hover:bg-[#2d3b42] text-white py-2 rounded-lg cursor-pointer"
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
