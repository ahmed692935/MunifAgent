import { useEffect, useState } from "react"
import { dashboardOverview } from "../../api/userDashboard"
import type { UserDashboard } from "../../Interface/UserDashboard"

function CallActivity() {

    const [data, setData] = useState<UserDashboard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Token ko aap context ya localStorage se le sakte hain
                const token = localStorage.getItem("token") || "";
                const response = await dashboardOverview(token);

                // Agar API directly object return karti hai
                setData(response);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full">
            <h2 className="text-base font-medium">
                Today's Activity
            </h2>

            {/* total Calls */}
            <div className="flex gap-4 justify-between item-center mt-3">
                <p className="text-base text-[#4A5565]">Total Calls</p>
                <p className="text-2xl font-semibold text-[#0A0A0A]">
                    {loading ? "..." : (data?.total_calls ?? 0)}
                </p>
            </div>

            {/* Missed Calls */}
            <div className="flex gap-4 justify-between item-center mt-3">
                <p className="text-base text-[#4A5565]">Missed</p>
                <p className="text-2xl font-semibold text-[#E7000B]">
                    {loading ? "..." : (data?.missed_calls ?? 0)}
                </p>
            </div>
        </div>
    )
}

export default CallActivity
