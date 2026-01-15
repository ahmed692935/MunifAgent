
import { useEffect, useState } from 'react';
import { FiCalendar, FiPhone, FiAlertTriangle, FiSettings, FiArrowRight } from 'react-icons/fi';
import { recentAction } from '../../api/userDashboard';
import type { ActionItem } from '../../Interface/UserDashboard';
import { Loader2 } from 'lucide-react';


function RecentActions() {

    const [actions, setActions] = useState<ActionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // const actions: ActionItem[] = [
    //     {
    //         id: 1,
    //         icon: <FiCalendar size={18} />,
    //         iconBg: 'bg-blue-50',
    //         iconColor: 'text-blue-600',
    //         description: 'Appointment booked with John Doe at 2 PM tomorrow.',
    //         time_ago: '2m ago',
    //     },
    //     {
    //         id: 2,
    //         icon: <FiPhone size={18} />,
    //         iconBg: 'bg-blue-50',
    //         iconColor: 'text-blue-600',
    //         description: 'AI successfully handled call regarding "Pricing Inquiry".',
    //         time_ago: '15m ago',
    //     },
    //     {
    //         id: 3,
    //         icon: <FiAlertTriangle size={18} />,
    //         iconBg: 'bg-amber-50',
    //         iconColor: 'text-amber-600',
    //         description: 'Missed call from +1 (555) 019-2332 (Caller hung up).',
    //         time_ago: '42m ago',
    //     },
    //     {
    //         id: 4,
    //         icon: <FiSettings size={18} />,
    //         iconBg: 'bg-blue-50',
    //         iconColor: 'text-blue-600',
    //         description: 'AI Agent configuration updated by Admin.',
    //         time_ago: '2h ago',
    //     },
    //     {
    //         id: 5,
    //         icon: <FiPhone size={18} />,
    //         iconBg: 'bg-blue-50',
    //         iconColor: 'text-blue-600',
    //         description: "AI transferred call to 'Support Team' queue.",
    //         time_ago: '3h ago',
    //     },
    // ];

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const token = localStorage.getItem("token") || ""; // Ya jahan bhi aapne token save kiya ho
                const response = await recentAction(token);
                if (response.success) {
                    setActions(response.actions);
                }
            } catch (error) {
                console.error("Error fetching recent actions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActions();
    }, []);

    // API string ko UI elements mein map karne ka function
    const getIconDetails = (iconName: string) => {
        switch (iconName) {
            case 'calendar':
                return {
                    component: <FiCalendar size={18} />,
                    bg: 'bg-blue-50',
                    color: 'text-blue-600'
                };
            case 'phone':
                return {
                    component: <FiPhone size={18} />,
                    bg: 'bg-blue-50',
                    color: 'text-blue-600'
                };
            case 'warning':
                return {
                    component: <FiAlertTriangle size={18} />,
                    bg: 'bg-amber-50',
                    color: 'text-amber-600'
                };
            case 'settings':
                return {
                    component: <FiSettings size={18} />,
                    bg: 'bg-blue-50',
                    color: 'text-blue-600'
                };
            default:
                return {
                    component: <FiSettings size={18} />,
                    bg: 'bg-gray-50',
                    color: 'text-gray-600'
                };
        }
    };

    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                    Recent Actions
                </h2>
                <button className="text-[#3B82F6] text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
                    View All <FiArrowRight size={14} />
                </button>
            </div>

            {/* Actions List */}
            <div className="flex flex-col gap-5 grow">
                {loading ? (
                    /* --- Loading Ring (Spinner) --- */
                    <div className="flex grow items-center justify-center py-10">
                        <Loader2 className="w-10 h-10 text-[#3d4b52] animate-spin" />
                    </div>
                ) : actions.length > 0 ? (
                    actions.map((action, index) => {
                        const iconData = getIconDetails(action.icon);
                        return (
                            <div key={index} className="flex items-center justify-between animate-fadeIn">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-lg flex items-center justify-center ${iconData.bg} ${iconData.color}`}>
                                        {iconData.component}
                                    </div>
                                    <p className="text-[14px] text-[#374151] font-normal leading-tight">
                                        {action.description}
                                    </p>
                                </div>
                                <span className="text-[13px] text-gray-400 whitespace-nowrap ml-4">
                                    {action.time_ago}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-sm text-gray-500 text-center py-10">No recent actions found.</p>
                )}
            </div>
        </div>
    );
}

export default RecentActions;