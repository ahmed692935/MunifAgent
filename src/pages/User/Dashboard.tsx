import { useState, useRef, useEffect } from "react"
import Navbar from "../../components/Navbar"
// import AgentControl from "../../components/user/AgentControl"
import CallActivity from "../../components/user/CallActivity"
import CallUsage from "../../components/user/CallUsage"
import AgentCards from "../../components/user/AgentCards"
import toast from "react-hot-toast"
import { getGoogleAuth, outlookCalendar } from "../../api/userDashboard"


function userDashboard() {

    const [googleLoading, setGoogleLoading] = useState(false);
    const [outlookLoading, setOutlookLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const token = localStorage.getItem("token");

    // Dropdown ke bahar click detect karne ke liye
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCalendarClick = async () => {
        if (!token) {
            toast.error("Missing authentication token");
            return;
        }

        setGoogleLoading(true);
        setIsDropdownOpen(false);
        try {
            const data = await getGoogleAuth(token);

            if (data?.authorization_url) {
                // Redirect in same tab
                window.location.href = data.authorization_url;
            } else {
                toast.error("Authorization URL not found");
            }
        } catch (error: any) {
            console.error("Google Auth Error:", error);
            toast.error(error?.message || "Something went wrong");
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleOutlookClick = async () => {
        if (!token) {
            toast.error("Missing authentication token");
            return;
        }

        const userData = localStorage.getItem("user");
        if (!userData) {
            toast.error("User data not found");
            return;
        }

        let userId;
        try {
            const user = JSON.parse(userData);
            userId = user.id;
        } catch (e) {
            toast.error("Invalid user data in session");
            return;
        }

        if (!userId) {
            toast.error("User ID not found");
            return;
        }

        setOutlookLoading(true);
        setIsDropdownOpen(false);
        try {
            const data = await outlookCalendar(token, userId);

            if (data?.authorization_url) {
                // Redirect in same tab
                window.location.href = data.authorization_url;
            } else {
                toast.error("Authorization URL not found");
            }
        } catch (error: any) {
            console.error("Outlook Auth Error:", error);
            toast.error(error?.message || "Something went wrong");
        } finally {
            setOutlookLoading(false);
        }
    };

    return (
        <div className="bg-[#F9FAFB] py-10 pt-25 px-5 min-h-screen">
            <Navbar />
            <div className="max-w-[1216px] mx-auto">

                {/* Dropdown Container */}
                <div className="w-full flex justify-end" ref={dropdownRef}>
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-center gap-2 py-2 px-5 h-fit w-fit rounded-lg bg-[#3d4b52] hover:bg-[#2d3b42] transition-all text-white font-medium text-base cursor-pointer"
                        >
                            {(googleLoading || outlookLoading) && (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            )}
                            Connect Calendar
                            <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                                <div className="py-1">
                                    <button
                                        onClick={handleCalendarClick}
                                        disabled={googleLoading}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                    >
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Google Calendar
                                    </button>
                                    <button
                                        onClick={handleOutlookClick}
                                        disabled={outlookLoading}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        {outlookLoading ? "Connecting..." : "Outlook Calendar"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 mt-5">
                    <CallActivity />
                    <CallUsage />
                </div>

                <div className="mt-5">
                    <AgentCards />
                </div>

            </div>
        </div>
    )
}

export default userDashboard



                {/* <AgentControl /> */}
                {/* <div className="w-full flex gap-5 justify-end">
                    <button
                        onClick={handleCalendarClick}
                        disabled={googleLoading}
                        className={`flex items-center justify-center gap-2 py-2 px-5 h-fit w-fit rounded-lg bg-[#3d4b52] hover:bg-[#2d3b42] hover:scale-105 transition-all text-white font-medium text-base cursor-pointer ${googleLoading ? "opacity-80 cursor-not-allowed" : ""}`}
                    >
                        {googleLoading && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                        Connect Calendar
                    </button>
                    <button
                        className={`flex items-center justify-center gap-2 py-2 px-5 h-fit w-fit rounded-lg bg-[#3d4b52] hover:bg-[#2d3b42] hover:scale-105 transition-all text-white font-medium text-base cursor-pointer`}
                    >
                        Outlook Calendar
                    </button>
                </div> */}