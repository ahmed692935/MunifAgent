import Navbar from "../../components/Navbar"
import AgentControl from "../../components/user/AgentControl"
import CallActivity from "../../components/user/CallActivity"
import CallUsage from "../../components/user/CallUsage"
import RecentActions from "../../components/user/RecentActions"

function userDashboard() {
    return (
        <div className="bg-[#F9FAFB] py-10 pt-25 px-5 h-screen">
            <Navbar />
            <div className="max-w-[1216px] mx-auto">

                <AgentControl />

                <div className="flex flex-col md:flex-row gap-5 mt-5">
                    <CallActivity />
                    <CallUsage />
                </div>

                <div className="mt-5">
                    <RecentActions />
                </div>

            </div>
        </div>
    )
}

export default userDashboard
