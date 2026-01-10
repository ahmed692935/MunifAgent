
import { FiCalendar, FiPhone, FiAlertTriangle, FiSettings, FiArrowRight } from 'react-icons/fi';
import type { ActionItem } from '../../Interface/User';



function RecentActions() {
    const actions: ActionItem[] = [
        {
            id: 1,
            icon: <FiCalendar size={18} />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            text: 'Appointment booked with John Doe at 2 PM tomorrow.',
            time: '2m ago',
        },
        {
            id: 2,
            icon: <FiPhone size={18} />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            text: 'AI successfully handled call regarding "Pricing Inquiry".',
            time: '15m ago',
        },
        {
            id: 3,
            icon: <FiAlertTriangle size={18} />,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            text: 'Missed call from +1 (555) 019-2332 (Caller hung up).',
            time: '42m ago',
        },
        {
            id: 4,
            icon: <FiSettings size={18} />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            text: 'AI Agent configuration updated by Admin.',
            time: '2h ago',
        },
        {
            id: 5,
            icon: <FiPhone size={18} />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            text: "AI transferred call to 'Support Team' queue.",
            time: '3h ago',
        },
    ];

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
            <div className="flex flex-col gap-5">
                {actions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Icon Container with dynamic background */}
                            <div className={`p-2.5 rounded-lg flex items-center justify-center ${action.iconBg} ${action.iconColor}`}>
                                {action.icon}
                            </div>

                            {/* Action Description */}
                            <p className="text-[14px] text-[#374151] font-normal leading-tight">
                                {action.text}
                            </p>
                        </div>

                        {/* Time Stamp */}
                        <span className="text-[13px] text-gray-400 whitespace-nowrap ml-4">
                            {action.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentActions;