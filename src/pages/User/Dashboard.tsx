import { useState } from "react"
import Navbar from "../../components/Navbar"
// import AgentControl from "../../components/user/AgentControl"
import CallActivity from "../../components/user/CallActivity"
import CallUsage from "../../components/user/CallUsage"
import AgentCards from "../../components/user/AgentCards"
import toast from "react-hot-toast"
import { getGoogleAuth } from "../../api/userDashboard"


function userDashboard() {

    const [googleLoading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const handleCalendarClick = async () => {
        if (!token) {
            toast.error("Missing authentication token");
            return;
        }

        setLoading(true);
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
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#F9FAFB] py-10 pt-25 px-5 min-h-screen">
            <Navbar />
            <div className="max-w-[1216px] mx-auto">

                {/* <AgentControl /> */}
                <div className="w-full flex justify-end">
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
