import { useEffect, useState } from "react";
import { planUsage } from "../../api/userDashboard";
import type { PlanUsageData } from "../../Interface/UserDashboard";

function CallUsage() {
    const [data, setData] = useState<PlanUsageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await planUsage(token);

                // Kyunki API response { success: true, data: {...} } hai
                if (response.success) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error fetching usage data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Values extraction with defaults
    const percentage = data?.percentage ?? 0;
    const usedMinutes = data?.used_minutes ?? 0;
    const totalMinutes = data?.total_minutes ?? 0;
    const resetDays = data?.reset_in_days ?? 0;

    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full max-w-2xl shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
                Plan Usage
            </h2>

            <div className="mt-3 flex items-baseline justify-between">
                <h2 className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                    {loading ? "..." : `${percentage}%`}
                </h2>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Used
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-[#03021333] rounded-full h-3 overflow-hidden">
                <div
                    className="bg-[#0A0A0B] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${loading ? 0 : percentage}%` }}
                ></div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 font-medium">
                {loading ? (
                    <span>Loading usage details...</span>
                ) : (
                    <>
                        <span>{usedMinutes} / {totalMinutes} Minutes</span>
                        {/* Sirf tab dikhayen agar resetDays available ho */}
                        {data?.reset_in_days !== undefined && (
                            <span>Resets in {resetDays} days</span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CallUsage;