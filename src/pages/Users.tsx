import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { getUsers } from "../api/api"
import { Loader2, Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

import OnboardModal from "../components/OnboardModal";
import { useTranslation } from "react-i18next";

// User interface for TypeScript
interface User {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    is_admin: boolean;
    is_check: boolean;
    agent_name: string | null;
    onboarding_completed: boolean;
}

function Users() {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Search state
    const [showOnboardModal, setShowOnboardModal] = useState(false); // Modal state

    // Fetch Users on Component Mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setTableLoading(true);
                const token = localStorage.getItem("token") || "";
                const data = await getUsers(token);
                // console.log("Frontend Data Check:", data);

                if (data.success) {
                    setUsers(data.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setTableLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter Logic: Username ke base par filter (Sorted New to Old)
    const filteredUsers = [...users]
        .sort((a, b) => b.id - a.id)
        .filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )

    // Agent Status Toggle Handler
    // const handleToggleAgent = async (userId: number, currentStatus: boolean) => {
    //     const token = localStorage.getItem("token") || "";
    //     const loadingToast = toast.loading("Updating agent status...");

    //     // Toggle logic: Current ka ulta (true -> false, false -> true)
    //     const newStatus = !currentStatus;
    //     const agentId = 1; // Aapki API image mein 1 hai, ise dynamic karein agar zaroorat ho

    //     try {
    //         // Charo parameters bhejein: token, userId, agentId, aur newStatus
    //         const data = await userActiveToggle(token, userId, agentId, newStatus);

    //         if (data.success) {
    //             setUsers((prev) =>
    //                 prev.map((u) =>
    //                     u.id === userId ? { ...u, is_active: data.data.is_active } : u
    //                 )
    //             );
    //             toast.success(data.error, { id: loadingToast });
    //         }
    //     } catch (error: any) {
    //         console.error("Toggle Error:", error.response?.data);
    //         toast.error(error.response?.data?.error || "Update failed", { id: loadingToast });
    //     }
    // };
    // // Header logic: Agar koi bhi user active agent hai to header change ho jaye
    // const isAnyAgentActive = users.some(u => u.is_active);

    // Admin Status Toggle Handler
    // const handleToggleAdmin = async (userId: number, currentStatus: boolean) => {
    //     const token = localStorage.getItem("token") || "";
    //     const newStatus = !currentStatus; // Toggle logic

    //     // Optimistic UI update: Pehle UI change kar dein (optional but feels fast)
    //     // Agar aap error handle karna chahte hain toh actual API response ke baad karein.

    //     const loadingToast = toast.loading("Updating status...");

    //     try {
    //         // API call with userId and the new status
    //         const data = await adminStatus(token, userId, newStatus);

    //         if (data.success) {
    //             setUsers((prev) =>
    //                 prev.map((u) => (u.id === userId ? { ...u, is_admin: newStatus } : u))
    //             );
    //             toast.success(data.message || "Status updated!", { id: loadingToast });
    //         }
    //     } catch (error: any) {
    //         console.error("422 Error Detail:", error.response?.data); // Isse debug karne mein madad milegi
    //         toast.error(error.response?.data?.message || "Failed to update admin status", { id: loadingToast });
    //     }
    // };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-25">
                <div className="max-w-5xl mx-auto border border-[#0000001A] rounded-[14px] bg-white p-6">
                    {/* <h1 className="text-xl font-semibold mb-6 text-[#101828]">Users</h1> */}
                    {/* Header aur Search Section */}
                    <div className="mb-6">
                        <button 
                            onClick={() => setShowOnboardModal(true)}
                            className="flex items-center gap-2 bg-[#3d4b52] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2d3b42] cursor-pointer mb-5"
                        >
                            <FaPlus />
                            {t("users.onboard")}
                        </button>
                        <h1 className="text-xl font-semibold text-[#101828]">{t("users.title")}</h1>

                        {/* Filter Input */}
                        <div className="relative w-full mt-5">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder={t("users.searchByUsername")}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2E68FF] focus:border-[#2E68FF] sm:text-sm transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        {/* Table with Horizontal Scroll */}
                        <div className="overflow-x-auto border border-[#EAECF0] rounded-lg relative min-h-[400px]">
                            {tableLoading && (
                                <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="w-8 h-8 text-[#2E68FF] animate-spin" />
                                        <span className="text-sm text-gray-500 font-medium">{t("users.loadingUsers")}</span>
                                    </div>
                                </div>
                            )}

                            <div className="min-w-[900px]">
                                {/* Header */}
                                <div className="grid grid-cols-12 px-6 py-3 text-xs font-semibold text-[#667085] uppercase bg-[#F9FAFB] border-b border-[#EAECF0]">
                                    <div className="col-span-3">{t("users.columns.name")}</div>
                                    <div className="col-span-3">{t("users.columns.email")}</div>
                                    <div className="col-span-2">{t("users.columns.agentStatus")}</div>
                                    <div className="col-span-3">{t("users.columns.agentName")}</div>
                                    {/* <div className="col-span-2 text-right">Admin</div> */}
                                </div>

                                {/* Body */}
                                <div className="divide-y divide-[#EAECF0]">
                                    {!tableLoading && filteredUsers.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">{t("users.noUsersFound")}</div>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <div key={user.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                                                {/* Name */}
                                                <div className="col-span-3">
                                                    <span className="text-sm font-medium text-[#101828] capitalize">
                                                        {user.username}
                                                    </span>
                                                </div>

                                                {/* Email */}
                                                <div className="col-span-3">
                                                    <span className="text-sm text-[#667085]">{user.email}</span>
                                                </div>

                                                {/* Status */}
                                                <div className="col-span-2">
                                                    <span className={`text-sm font-medium ${user.is_check ? 'text-green-600' : 'text-gray-500'}`}>
                                                        {user.is_check ? t("users.assigned") : t("users.notAssigned")}
                                                    </span>
                                                </div>

                                                {/* agent name */}
                                                <div className="col-span-3">
                                                    <span className="text-sm text-[#667085]">
                                                        {user.agent_name || t("common.na")}
                                                    </span>
                                                </div>

                                                {/* Admin Toggle */}
                                                {/* <div className="col-span-2 flex justify-end">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={user.is_admin}
                                                            onChange={() => handleToggleAdmin(user.id, user.is_admin)}
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E68FF]"></div>
                                                    </label>
                                                </div> */}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="mt-4 flex items-center justify-between px-2">
                            <p className="text-sm text-gray-500">{t("users.showingUsers", { count: users.length })}</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50" disabled>{t("common.previous")}</button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50" disabled>{t("common.next")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <OnboardModal 
                open={showOnboardModal} 
                onClose={() => setShowOnboardModal(false)}
                onUserAdded={() => {
                    const token = localStorage.getItem("token") || "";
                    getUsers(token).then(data => {
                        if (data.success) setUsers(data.data.users);
                    });
                }}
            />
        </>
    )
}

export default Users
