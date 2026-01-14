import { useEffect, useState } from "react";
import { dashboardOverview } from "../../api/userDashboard";
import type { UserDashboard } from "../../Interface/UserDashboard";

function CallUsage() {

    const [data, setData] = useState<UserDashboard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await dashboardOverview(token);
                setData(response);
            } catch (error) {
                console.error("Error fetching usage data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Values extraction with fallback (defaults)
    const percentage = data?.percentage ?? 0;
    const usedMinutes = data?.used_minutes ?? 0;
    const totalMinutes = data?.total_minutes ?? 0;
    const resetDays = data?.reset_in_days ?? 0;

    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full max-w-2xl shadow-sm">
            {/* Title */}
            <h2 className="text-base font-semibold text-gray-900">
                Plan Usage
            </h2>

            {/* Percentage Section */}
            <div className="mt-3 flex items-baseline justify-between">
                <h2 className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                    {loading ? "..." : `${percentage}%`}
                </h2>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Used
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-[#03021333] rounded-full h-3">
                <div
                    className="bg-[#0A0A0B] h-full rounded-full"
                    style={{ width: `${loading ? 0 : percentage}%` }}
                ></div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 font-medium">
                {loading ? (
                    <span>Loading usage details...</span>
                ) : (
                    <>
                        <span>{usedMinutes} / {totalMinutes} Minutes</span>
                        <span>Resets in {resetDays} days</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default CallUsage
