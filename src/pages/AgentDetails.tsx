import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Navbar from "../components/Navbar";
import type { Agent, CallLog, TranscriptItem } from "../Interface/AgentDetails";
import AgentImg from "../assets/Images/Agent.png";
import { getAgentById, resetAgentMinutes } from "../api/api";
import toast from "react-hot-toast";
import { FiRotateCw } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const AgentDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);

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
          {t("agentDetails.loading")}
        </p>
      </div>
    );
  }

  if (!agent) {
    return <p className="text-center mt-40 text-red-500">{t("agentDetails.notFound")}</p>;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t("common.na");

    const d = new Date(dateString);
    const locale = i18n.language?.startsWith("de") ? "de-DE" : "en-GB";
    const datePart = d.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timePart = d.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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
            {t("agentDetails.titlePrefix")}{" "}
            <span className="font-normal text-2xl">{agent?.agent_name}</span>
          </h1>
          <div>
            <img
              // src={AgentImg}
              src={agent?.avatar_presigned_url || AgentImg}
              alt={t("agentDetails.alt.agentImage")}
              className="h-20 w-20 rounded-full"
            />
          </div>
        </div>

        {/* Agent Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl">
          <h2 className="text-lg font-bold mb-4 text-[#3d4b52]">{t("agentDetails.agentInfo")}</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-[#3d4b52]">
            <p>
              <strong>{t("agentDetails.labels.name")}</strong> {agent?.agent_name}
            </p>
            <p>
              <strong>{t("agentDetails.labels.phone")}</strong> {agent?.phone_number}
            </p>
            <p>
              <strong>{t("agentDetails.labels.transferNumber")}</strong> {(agent as any)?.transfer_number || t("common.na")}
            </p>
            <p>
              <strong>{t("agentDetails.labels.language")}</strong> {agent?.language}
            </p>
            <p>
              <strong>{t("agentDetails.labels.voiceType")}</strong> {agent?.voice_type}
            </p>
            <p>
              <strong>{t("agentDetails.labels.industry")}</strong> {agent?.industry}
            </p>
            <p>
              <strong>{t("agentDetails.labels.owner")}</strong> {agent?.owner_name}
            </p>
            <p>
              <strong>{t("agentDetails.labels.allowedMinutes")}</strong>{" "}
              {t("agentDetails.minutesShort", {
                count: Number(agent?.allowed_minutes ?? 0) || 0,
              })}
            </p>
            <p>
              <strong>{t("agentDetails.labels.ownerEmail")}</strong> {agent?.owner_email}
            </p>
            <p>
              <strong>{t("agentDetails.labels.businessHoursStart")}</strong>{" "}
              {agent?.business_hours_start}
            </p>
            <p>
              <strong>{t("agentDetails.labels.businessHoursEnd")}</strong> {agent?.business_hours_end}
            </p>
          </div>
          <div className="mt-4">
            <strong className="text-[#3d4b52] text-lg">{t("agentDetails.systemPrompt")}</strong>
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
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.totalCalls")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.completed_calls}
            </p>
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.completed")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {agent?.call_stats?.unanswered_calls}
            </p>
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.unanswered")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {t("agentDetails.minutesShort", {
                count: Math.floor((agent?.call_stats?.avg_duration ?? 0) / 60),
              })}
            </p>
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.avgDuration")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            <p className="text-2xl font-bold">
              {t("agentDetails.minutesShort", {
                count: Math.floor((agent?.call_stats?.total_duration ?? 0) / 60),
              })}
            </p>
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.totalDuration")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center text-center hover:shadow-xl border hover:scale-102">
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <strong>{t("agentDetails.stats.firstCall")}</strong>{" "}
                {agent?.call_stats?.first_call_at
                  ? new Date(agent.call_stats.first_call_at).toLocaleString(
                    i18n.language?.startsWith("de") ? "de-DE" : "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )
                  : t("common.na")}
              </p>
              <p>
                <strong>{t("agentDetails.stats.lastCall")}</strong>{" "}
                {agent?.call_stats?.last_call_at
                  ? new Date(agent.call_stats.last_call_at).toLocaleString(
                    i18n.language?.startsWith("de") ? "de-DE" : "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )
                  : t("common.na")}
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
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.allowedMinutesCard")}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center hover:shadow-xl border hover:scale-102">
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <strong>{t("agentDetails.stats.percentageUsed")}</strong>{" "}
                {agent?.minutes_info?.percentage_used ?? 0}%
              </p>
              <p>
                <strong>{t("agentDetails.stats.usedMins")}</strong>{" "}
                {t("agentDetails.minutesShort", {
                  count: Number(agent?.minutes_info?.used_minutes ?? 0) || 0,
                })}
              </p>
            </div>
          </div>

          <div className="relative bg-white p-4 rounded-lg shadow text-center hover:shadow-xl border hover:scale-102">
            {/* Reset icon at top-right */}
            {/* Reset icon at top-right */}
            {user?.is_admin && (
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-[#3d4b52]"
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  if (!token || !agent?.id) return;

                  try {
                    await resetAgentMinutes(token, agent.id);
                    toast.success(t("agentDetails.toast.minutesReset"));
                    // Refetch agent to update minutes
                    fetchData(currentPage);
                  } catch (err) {
                    console.error(err);
                    toast.error(t("agentDetails.toast.minutesResetFailed"));
                  }
                }}
              >
                <FiRotateCw size={20} />
              </button>
            )}

            <p className="text-2xl font-bold">
              {t("agentDetails.minutesShort", {
                count: Number(agent?.minutes_info?.used_minutes ?? 0) || 0,
              })}
            </p>
            <p className="text-gray-600 text-sm">{t("agentDetails.stats.usedMinutes")}</p>
          </div>
        </div>

        {/* Calls Table */}
        {/* Calls Table */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {t("agentDetails.callHistory")}
          </h2>

          {/* Scrollable wrapper */}
          <div className="overflow-x-auto rounded-t-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#3d4b52] text-white text-left">
                  <th className="p-3">{t("agentDetails.table.callerNumber")}</th>
                  <th className="p-3">{t("agentDetails.table.date")}</th>
                  <th className="p-3">{t("agentDetails.table.endedAt")}</th>
                  <th className="p-3">{t("agentDetails.table.transcript")}</th>
                  <th className="p-3">{t("agentDetails.table.recording")}</th>
                </tr>
              </thead>
              <tbody>
                {calls.length > 0 ? (
                  calls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-300">
                      {/* <td className="p-3">{call.created_at}</td>
                      <td className="p-3">{call.ended_at || "N/A"}</td> */}
                      <td className="p-3">{call.caller_number}</td>
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
                                    i.role === "assistant"
                                      ? t("agentDetails.transcriptRoles.agent")
                                      : t("agentDetails.transcriptRoles.user");
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
                          {t("agentDetails.viewTranscript")}
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
                          {t("agentDetails.play")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-3 text-gray-500">
                      {t("agentDetails.noCallHistory")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchData(currentPage - 1)}
                className={`px-4 py-2 rounded ${currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#3d4b52] text-white hover:bg-[#2d3b42]"
                  }`}
              >
                {t("common.prev")}
              </button>

              <span className="px-4 py-2 rounded bg-gray-200">
                {t("common.pageOf", { page: currentPage, total: totalPages })}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchData(currentPage + 1)}
                className={`px-4 py-2 rounded ${currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#3d4b52] text-white hover:bg-[#2d3b42]"
                  }`}
              >
                {t("common.next")}
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Modal */}
        {openTranscript && transcriptData && (
          <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-50 flex items-center justify-center top-20 p-4">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4 text-center">{t("agentDetails.transcriptModalTitle")}</h3>
              <pre className="whitespace-pre-wrap">{transcriptData}</pre>
              <button
                className="w-full mt-10 bg-[#3d4b52] hover:bg-[#2d3b42] text-white py-2 rounded-lg cursor-pointer"
                onClick={() => setOpenTranscript(null)}
              >
                {t("agentDetails.close")}
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
              <h3 className="text-lg font-semibold mb-2">{t("agentDetails.recordingModalTitle")}</h3>
              <audio controls autoPlay className="w-full">
                <source src={openRecording} type="audio/ogg" />
              </audio>
              <button
                onClick={() => setOpenRecording(null)}
                className="mt-4 w-full bg-[#3d4b52] hover:bg-[#2d3b42] text-white py-2 rounded-lg cursor-pointer"
              >
                {t("agentDetails.close")}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentDetails;
