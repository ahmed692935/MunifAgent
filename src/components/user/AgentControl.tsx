import { useState, useEffect } from "react"
import { dashboardOverview } from "../../api/userDashboard"
import type { UserDashboardData } from "../../Interface/UserDashboard"
import { useTranslation } from "react-i18next"

function agentControl() {
    const { t } = useTranslation();

    const [isActive, setIsActive] = useState<boolean>(false);
    const [data, setData] = useState<UserDashboardData | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await dashboardOverview(token);

                if (response.success) {
                    setData(response.data);
                    // API se aane wali status ko local state mein set karein
                    setIsActive(response.data.agent_status.is_active);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggle = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            <div className="w-full bg-white border border-[#0000001A]  rounded-[14px] p-6">

                {/* Left Side: Content and Toggle */}
                <div className="w-full">
                    <h3 className="text-gray-900 font-medium text-base">{t("agentControl.title")}</h3>
                    <p className="text-gray-500 text-base mt-3">
                        {t("agentControl.subtitle")}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3">
                    {/* Custom Toggle Switch */}

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleToggle}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${isActive ? 'bg-black' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-4.5' : 'translate-x-1'
                                    }`}
                            />
                        </button>

                        {/* Status Text */}
                        <div className="">
                            <p className="text-gray-900 font-semibold text-sm">
                                {isActive ? t("agentControl.agentOn") : t("agentControl.agentOff")}
                            </p>
                            <span className="text-gray-400 text-xs">
                                {data?.agent_status.status_text || (isActive ? t("agentControl.statusHandling") : t("agentControl.statusPaused"))}
                            </span>
                        </div>
                    </div>
                    {/* Right Side: Badge */}
                    <div className="flex items-start sm:items-center">
                        <span
                            className={`px-4 py-1 rounded-full text-xs font-medium transition-colors 
                                ${isActive
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                        >
                            {isActive ? t("agentControl.badgeActive") : t("agentControl.badgeInactive")}
                        </span>
                    </div>
                </div>


            </div>
        </>
    )
}

export default agentControl
