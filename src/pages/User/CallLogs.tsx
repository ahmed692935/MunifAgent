import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Filter, ChevronLeft, ChevronRight, Eye, Download, User, Building2, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import type { CallLog, CallStatus } from '../../Interface/User';
import CallModal from '../../components/user/CallModal';

const INITIAL_DATA: CallLog[] = [
    { id: 1, name: "John Smith", phone: "+1 (555) 123-4567", status: "BOOKED", dateTime: "2025-12-22T14:30:00", duration: "4m 12s" },
    { id: 2, name: "Unknown Caller", phone: "+1 (999) 000-1111", status: "SPAM", dateTime: "2025-12-22T13:15:00", duration: "0m 35s" },
    { id: 3, name: "Acme Corp HQ", phone: "+1 (555) 987-6543", status: "QUERY", dateTime: "2025-12-22T11:00:00", duration: "2m 05s", isCompany: true },
    { id: 4, name: "Jane Doe", phone: "+1 (555) 555-0199", status: "BOOKED", dateTime: "2025-12-21T16:45:00", duration: "5m 30s" },
    { id: 5, name: "(Hung up)", phone: "+1 (555) 222-3333", status: "MISSED", dateTime: "2025-12-21T16:30:00", duration: "0m 00s" },
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 6,
        name: `User ${i + 6}`,
        phone: `+1 (555) 000-00${i + 6}`,
        status: (['BOOKED', 'SPAM', 'QUERY', 'MISSED'] as CallStatus[])[Math.floor(Math.random() * 4)],
        dateTime: "2025-12-15T10:00:00",
        duration: "1m 20s"
    }))
];

const CallLogs = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('7');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!pageLoading) {
            setTableLoading(true);
            const timer = setTimeout(() => setTableLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [searchTerm, dateRange, statusFilter, currentPage]);

    const filteredLogs = useMemo(() => {
        return INITIAL_DATA.filter(log => {
            const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase()) || log.phone.includes(searchTerm);
            const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
            const logDate = new Date(log.dateTime);
            const now = new Date("2025-12-23");
            const diffDays = (now.getTime() - logDate.getTime()) / (1000 * 3600 * 24);
            return matchesSearch && matchesStatus && diffDays <= parseInt(dateRange);
        });
    }, [searchTerm, dateRange, statusFilter]);

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const currentItems = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStatusStyle = (status: CallStatus) => {
        switch (status) {
            case 'BOOKED': return 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]';
            case 'SPAM': return 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
            case 'QUERY': return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
            case 'MISSED': return 'bg-[#F2F4F7] text-[#344054] border-[#EAECF0]';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // ===================
    // Modal states and handlers
    // ===================
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

    const handleViewDetails = (log: CallLog) => {
        setSelectedCall(log);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-[#F9FAFB] min-h-screen font-sans">
            {/* Navbar hamesha dikhega */}
            <Navbar />

            <div className="pt-28 pb-10 px-5">
                <div className="max-w-[1216px] mx-auto min-h-[500px]">

                    {/* Page Content ya Loading Spinner */}
                    {pageLoading ? (
                        <div className="w-full h-[400px] flex flex-col items-center justify-center bg-white border border-[#0000001A] rounded-[14px] shadow-sm">
                            <Loader2 className="w-10 h-10 text-[#3d4b52] animate-spin" />
                            <p className="mt-4 text-[#667085] font-medium"></p>
                        </div>
                    ) : (
                        <div className="bg-white p-6 border border-[#0000001A] rounded-[14px] shadow-sm relative">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center mb-8">
                                <h1 className="text-xl font-semibold text-[#101828]">Call Logs & History</h1>
                                <button className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] hover:bg-gray-50 transition-all">
                                    <Download size={18} /> Export CSV
                                </button>
                            </div>

                            {/* Filters Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search Caller ID..."
                                        className="w-full pl-10 pr-4 py-2 bg-[#F2F4F7] border-none rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
                                    <select
                                        className="w-full pl-10 pr-4 py-2 bg-[#F2F4F7] border-none rounded-lg appearance-none cursor-pointer outline-none"
                                        value={dateRange}
                                        onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1); }}
                                    >
                                        <option value="1">Last 1 Day</option>
                                        <option value="7">Last 7 Days</option>
                                        <option value="30">Last 1 Month</option>
                                        <option value="90">Last 3 Months</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
                                    <select
                                        className="w-full pl-10 pr-4 py-2 bg-[#F2F4F7] border-none rounded-lg appearance-none cursor-pointer outline-none"
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="BOOKED">Booked</option>
                                        <option value="SPAM">Spam</option>
                                        <option value="QUERY">Query</option>
                                        <option value="MISSED">Missed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Table with Horizontal Scroll */}
                            <div className="overflow-x-auto border border-[#EAECF0] rounded-lg relative min-h-[300px]">
                                {tableLoading && (
                                    <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-[#3d4b52] animate-spin" />
                                    </div>
                                )}

                                <div className="min-w-[900px]">
                                    <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-[#667085] uppercase bg-[#F9FAFB] border-b border-[#EAECF0]">
                                        <div className="col-span-4">Caller Detail</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-3">Date & Time</div>
                                        <div className="col-span-2">Duration</div>
                                        <div className="col-span-1 text-right">Action</div>
                                    </div>

                                    <div className="divide-y divide-[#EAECF0]">
                                        {currentItems.map((log) => (
                                            <div key={log.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-[#F9FAFB] transition-colors">
                                                <div className="col-span-4 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085]">
                                                        {log.isCompany ? <Building2 size={20} /> : <User size={20} />}
                                                    </div>
                                                    <div className="truncate">
                                                        <div className="text-sm font-medium text-[#101828]">{log.name}</div>
                                                        <div className="text-sm text-[#667085]">{log.phone}</div>
                                                    </div>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium border flex items-center w-fit gap-1.5 ${getStatusStyle(log.status)}`}>
                                                        <span className={`w-1 h-1 rounded-full ${log.status === 'BOOKED' ? 'bg-[#027A48]' :
                                                            log.status === 'SPAM' ? 'bg-[#B42318]' :
                                                                log.status === 'QUERY' ? 'bg-[#175CD3]' : 'bg-[#344054]'
                                                            }`}></span>
                                                        {log.status}
                                                    </span>
                                                </div>
                                                <div className="col-span-3 text-sm text-[#667085]">
                                                    {new Date(log.dateTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                                </div>
                                                <div className="col-span-2 text-sm text-[#667085]">{log.duration}</div>
                                                <div className="col-span-1 text-right">
                                                    <button
                                                        onClick={() => handleViewDetails(log)}
                                                        className="px-3 py-1.5 bg-[#3d4b52] text-white text-[11px] font-semibold rounded-lg hover:bg-[#2d3b42] flex items-center gap-1 ml-auto cursor-pointer"
                                                    >
                                                        <Eye size={14} /> View
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <p className="text-sm text-[#667085]">Showing {filteredLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={18} /></button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-lg text-sm ${currentPage === i + 1 ? 'bg-[#2d3b42] text-white' : 'border'}`}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={18} /></button>
                                </div>
                            </div>
                        </div>
                    )}
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