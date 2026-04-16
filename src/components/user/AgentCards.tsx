// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
import Agent from "../../assets/Images/Agent.png";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import EditAgent from "./EditAgent";
import type { AgentType, AnalyticsData } from "../../Interface/AddAgent";
import { IoMdSearch } from "react-icons/io";

import {
    getAnalyticsDashboard,
    getAllAgents,
    deleteAgent,
    searchAgentsByOwner,
} from "../../api/api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const AgentCards = () => {
    const { t } = useTranslation();
    const [editOpen, setEditOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);

    const [searchText, setSearchText] = useState("");
    const [agentSearchText, setAgentSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<AgentType[]>([]);
    const [isSearchingMode, setIsSearchingMode] = useState(false);

    const handleSearch = async () => {
        const token = localStorage.getItem("token");

        if (!token || !searchText.trim()) {
            setIsSearchingMode(false);
            setSearchResults([]);
            return;
        }

        // Clear agent search when searching by owner
        setAgentSearchText("");

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

    const getFilteredAgents = (agents: AgentType[]) => {
        if (!agentSearchText.trim()) return agents;
        return agents.filter((agent) =>
            agent.agent_name.toLowerCase().includes(agentSearchText.toLowerCase())
        );
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
            toast.success(response?.message || t("dashboardAdmin.toast.agentDeleted"));
            await reloadAgents();
        } catch (err: unknown) {
            const error = err as AxiosError<{ error: string }>;
            toast.error(error?.response?.data?.error || t("dashboardAdmin.toast.agentDeleteFailed"));
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
            {/* <Navbar /> */}
            <div className="">
                {/* ---------- Top Analytics ---------- */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {/* <div className="bg-white border text-[#3d4b52] rounded-xl p-6 shadow-md text-center transition-all duration-300 hover:shadow-2xl hover:border-2 hover:-translate-y-1">
                        <h3 className="text-xl font-semibold">Total Calls Received</h3>
                        <p className="text-3xl font-bold mt-2">
                            {analytics?.total_calls ?? 0}
                        </p>
                    </div> */}

                    <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full">
                        <div className="flex items-center justify-between py-10">
                            <h3 className="text-base font-medium">{t("dashboardAdmin.totalAgents")}</h3>
                            <p className="text-2xl font-semibold text-[#0A0A0A]">
                                {analytics?.total_agents ?? 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Bars */}
                <div className="mb-6 space-y-4">
                    {/* Search by Owner */}
                    {user?.is_admin && (
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder={t("dashboardAdmin.searchOwner")}
                                className="w-full px-4 py-3 pr-12 focus:ring-0 outline-none border border-[#0000001A] rounded-[14px] bg-white"
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
                                <IoMdSearch size={25} />
                            </button>
                        </div>
                    )}

                    {/* Search by Agent Name */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder={t("dashboardUser.searchAgentName")}
                            className="w-full px-4 py-3 pr-12 focus:ring-0 outline-none border border-[#0000001A] rounded-[14px] bg-white"
                            value={agentSearchText}
                            onChange={(e) => {
                                setAgentSearchText(e.target.value);
                            }}
                        />

                        <button
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#3d4b52] cursor-pointer"
                        >
                            <IoMdSearch size={25} />
                        </button>
                    </div>
                </div>

                {/* SEARCH MODE UI */}
                {isSearchingMode && (
                    <div className="">
                        {getFilteredAgents(searchResults).length === 0 ? (
                            <p className="text-center text-[#3d4b52] mt-10 text-xl font-semibold">
                                {t("dashboardAdmin.noAgentsFound")}
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                                {getFilteredAgents(searchResults).map((agent) => (
                                    <div
                                        key={agent.id}
                                        className="bg-white shadow-lg rounded-2xl p-5 border hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={agent.avatar_presigned_url || Agent}
                                                    alt={t("agentDetails.alt.agentImage")}
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
                                                {user?.is_admin && (
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

                                        <p className="mt-3 font-medium">{agent.owner_name} {" "}
                                            <span className="text-sm text-gray-500">({t("dashboardAdmin.ownerName")})</span>
                                        </p>

                                        <p className="mt-2 text-sm line-clamp-2">
                                            {agent.system_prompt ||
                                                t("dashboardAdmin.agentDefaultPrompt")}
                                        </p>

                                        <button
                                            className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42] cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/agent/${agent.id}`);
                                            }}
                                        >
                                            {t("dashboardAdmin.seeMore")}
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
                            ) : getFilteredAgents(apiAgents).length === 0 ? (
                                <p className="text-center col-span-3 mt-10">{t("dashboardAdmin.noAgentsFound")}</p>
                            ) : (
                                getFilteredAgents(apiAgents).map((agent) => (
                                    <div
                                        key={agent.id}
                                        id={`agent-card-${agent.id}`}
                                        className="bg-white shadow-lg rounded-2xl p-5 border hover:border-2 hover:shadow-2xl transition cursor-pointer text-[#3d4b52]"
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={agent.avatar_presigned_url || Agent}
                                                    alt={t("agentDetails.alt.agentImage")}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                                                />
                                                <div>
                                                    {/* <h3 className="text-lg font-semibold">
                            {agent.agent_name}
                          </h3> */}
                                                    <h3 className="text-lg font-semibold">
                                                        {agent.agent_name.split(" ").slice(0, 1).join(" ")}
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

                                                {user?.is_admin && (
                                                    deletingId === agent.id ? (
                                                        <div className="w-5 h-5 border-2 border-t-red-600 border-gray-300 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <MdDeleteOutline
                                                            className="hover:text-red-600 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteAgent(agent.id);
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <p className="mt-3 font-medium">{agent.owner_name} {" "}
                                            <span className="text-sm text-gray-500">({t("dashboardAdmin.ownerName")})</span>
                                        </p>

                                        <p className="mt-2 text-sm line-clamp-2">
                                            {agent.system_prompt ||
                                                t("dashboardAdmin.agentDefaultPrompt")}
                                        </p>

                                        <button
                                            className="mt-5 w-full bg-[#3d4b52] text-white font-semibold py-2 rounded-lg hover:bg-[#2d3b42]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/agent/${agent.id}`);
                                            }}
                                        >
                                            {t("dashboardAdmin.seeMore")}
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
                                {t("common.prev")}
                            </button>
                            <span className="px-3 py-2">
                                {t("common.pageOf", { page, total: totalPages })}
                            </span>
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                            >
                                {t("common.next")}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <EditAgent
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

export default AgentCards;
