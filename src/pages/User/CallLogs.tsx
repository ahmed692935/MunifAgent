import React, { useState } from 'react';
import { FiSearch, FiDownload, FiCalendar, FiFolder, FiEye, FiUser, FiSmartphone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { CallLog } from '../../Interface/AgentDetails';

function CallLogs() {

    // Mook data
    const callData = [
        { id: 1, name: "John Smith", phone: "+1 (555) 123-4567", status: "BOOKED", dateTime: "Dec 22, 2:30 PM", duration: "4m 12s" },
        { id: 2, name: "Unknown Caller", phone: "+1 (999) 000-1111", status: "SPAM", dateTime: "Dec 22, 1:15 PM", duration: "0m 35s" },
        { id: 3, name: "Acme Corp HQ", phone: "+1 (555) 987-6543", status: "QUERY", dateTime: "Dec 22, 11:00 AM", duration: "2m 05s", isCompany: true },
        { id: 4, name: "Jane Doe", phone: "+1 (555) 555-0199", status: "BOOKED", dateTime: "Dec 21, 4:45 PM", duration: "5m 30s" },
        { id: 5, name: "(Hung up)", phone: "+1 (555) 222-3333", status: "MISSED", dateTime: "Dec 21, 4:30 PM", duration: "0m 00s" },
    ];

    const StatusBadge = ({ status }) => {
        const styles = {
            BOOKED: "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]",
            SPAM: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
            QUERY: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
            MISSED: "bg-[#F2F4F7] text-[#344054] border-[#EAECF0]",
        };

        const dotColors = {
            BOOKED: "bg-[#12B76A]",
            SPAM: "bg-[#F04438]",
            QUERY: "bg-[#2E90FA]",
            MISSED: "bg-[#667085]",
        };

        return (
            <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${styles[status]}`}>
                <span className={`w-2 h-2 rounded-full ${dotColors[status]}`}></span>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-[#F9FAFB] py-10 px-5 h-screen">
            <div className="max-w-[1216px] mx-auto bg-white p-6 border border-[#0000001A] rounded-[14px]">
                <div className="flex gap-5 justify-between">
                    <h1>Call Logs & History</h1>
                </div>
            </div>
        </div>
    )
}

export default CallLogs
