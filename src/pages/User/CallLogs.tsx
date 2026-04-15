import { useState, useEffect } from 'react';
import { Eye, User, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import type { Call, CallStatus, Pagination } from '../../Interface/User';
import CallModal from '../../components/user/CallModal';
import { getCalls } from '../../api/userDashboard';
import { useTranslation } from 'react-i18next';

const CallLogs = () => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [calls, setCalls] = useState<Call[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage] = useState(1);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const data = await getCalls(token);
            if (data && data.success) {
                setCalls(data.calls);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error("Error fetching calls:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const filteredLogs = calls; // Currently no filters applied

    const getStatusStyle = (status: CallStatus) => {
        switch (status) {
            case 'completed': return 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]';
            case 'failed': return 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
            case 'in_progress': return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
            case 'missed': return 'bg-[#F2F4F7] text-[#344054] border-[#EAECF0]';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusDotColor = (status: CallStatus) => {
        switch (status) {
            case 'completed': return 'bg-[#027A48]';
            case 'failed': return 'bg-[#B42318]';
            case 'in_progress': return 'bg-[#175CD3]';
            case 'missed': return 'bg-[#344054]';
            default: return 'bg-gray-500';
        }
    }

    const handleViewDetails = (log: Call) => {
        setSelectedCall(log);
        setIsModalOpen(true);
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return t('callLogs.durationFormat', { minutes, seconds: remainingSeconds });
    };

    const dateLocale = i18n.language?.startsWith('de') ? 'de-DE' : 'en-US';

    return (
        <div className="bg-[#F9FAFB] min-h-screen font-sans">
            <Navbar />

            <div className="pt-28 pb-10 px-5">
                <div className="max-w-[1216px] mx-auto min-h-[500px]">
                    <div className="bg-white p-6 border border-[#0000001A] rounded-[14px] shadow-sm relative">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center mb-8">
                            <h1 className="text-xl font-semibold text-[#101828]">{t('callLogs.title')}</h1>
                            {/* <button className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] hover:bg-gray-50 transition-all">
                                <Download size={18} /> Export CSV
                            </button> */}
                        </div>



                        {/* Table with Horizontal Scroll */}
                        <div className="overflow-x-auto border border-[#EAECF0] rounded-lg relative min-h-[300px]">
                            {loading && (
                                <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-[#3d4b52] animate-spin" />
                                </div>
                            )}

                            <div className="min-w-[900px]">
                                <div className="grid grid-cols-13 px-4 py-3 text-xs font-medium text-[#667085] uppercase bg-[#F9FAFB] border-b border-[#EAECF0]">
                                    <div className="col-span-3">{t('callLogs.columns.callerDetail')}</div>
                                    <div className="col-span-2">{t('callLogs.columns.agentName')}</div>
                                    <div className="col-span-2">{t('callLogs.columns.status')}</div>
                                    <div className="col-span-3">{t('callLogs.columns.dateTime')}</div>
                                    <div className="col-span-2">{t('callLogs.columns.duration')}</div>
                                    <div className="col-span-1 text-right">{t('callLogs.columns.action')}</div>
                                </div>

                                <div className="divide-y divide-[#EAECF0]">
                                    {filteredLogs.length > 0 ? (
                                        filteredLogs.map((log) => (
                                            <div key={log.id} className="grid grid-cols-13 px-4 py-4 items-center hover:bg-[#F9FAFB] transition-colors">
                                                <div className="col-span-3 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085]">
                                                        <User size={20} />
                                                    </div>
                                                    <div className="truncate">
                                                        <div className="text-sm font-medium text-[#101828]">{log.caller_number}</div>
                                                        {/* <div className="text-sm text-[#667085]">ID: {log.call_id}</div> */}
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-sm text-[#667085]">{log.agent_name}</div>
                                                <div className="col-span-2">
                                                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium border flex items-center w-fit gap-1.5 ${getStatusStyle(log.status)}`}>
                                                        <span className={`w-1 h-1 rounded-full ${getStatusDotColor(log.status)}`}></span>
                                                        {log.status}
                                                    </span>
                                                </div>
                                                <div className="col-span-3 text-sm text-[#667085]">
                                                    {(() => {
                                                        const dateStr = log.created_at || log.started_at;
                                                        if (!dateStr) return t('common.na');
                                                        const date = new Date(dateStr);
                                                        return !isNaN(date.getTime())
                                                            ? date.toLocaleString(dateLocale, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
                                                            : t('callLogs.invalidDate');
                                                    })()}
                                                </div>
                                                <div className="col-span-2 text-sm text-[#667085]">{formatDuration(log.duration)}</div>
                                                <div className="col-span-1 text-right">
                                                    <button
                                                        onClick={() => handleViewDetails(log)}
                                                        className="px-3 py-1.5 bg-[#3d4b52] text-white text-[11px] font-semibold rounded-lg hover:bg-[#2d3b42] flex items-center gap-1 ml-auto cursor-pointer"
                                                    >
                                                        <Eye size={14} /> {t('callLogs.view')}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        !loading && <div className="p-4 text-center text-sm text-gray-500">{t('callLogs.noLogs')}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        {pagination && (
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <p className="text-sm text-[#667085]">
                                    {pagination.total === 0
                                        ? t('callLogs.showingNone', { total: pagination.total })
                                        : t('callLogs.showingRange', {
                                            from: (pagination.page - 1) * pagination.page_size + 1,
                                            to: Math.min(pagination.page * pagination.page_size, pagination.total),
                                            total: pagination.total,
                                        })}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CallModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                callData={selectedCall}
            />
        </div>
    );
};

export default CallLogs;