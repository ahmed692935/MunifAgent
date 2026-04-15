// import React, { useState } from 'react';
// import {
//     X, User, Phone, Calendar, Clock, Mail,
//     Play, Download, MapPin
// } from 'lucide-react';
// import type { CallLog } from '../../Interface/User';

// interface CallModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     callData: CallLog | null;
// }

// const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, callData }) => {
//     const [activeTab, setActiveTab] = useState('Transcript');

//     if (!isOpen || !callData) return null;

//     const getStatusStyle = (status: string) => {
//         switch (status) {
//             case 'BOOKED': return 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]';
//             case 'SPAM': return 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
//             case 'QUERY': return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
//             default: return 'bg-[#F2F4F7] text-[#344054] border-[#EAECF0]';
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//             <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

//                 {/* Header */}
//                 <div className="p-6 pb-2 flex justify-between items-start">
//                     <div>
//                         <div className="flex items-center gap-3">
//                             <h2 className="text-2xl font-bold text-[#101828]">Call Details</h2>
//                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(callData.status)}`}>
//                                 {callData.status}
//                             </span>
//                         </div>
//                         <p className="text-sm text-[#667085] mt-1">Comprehensive information about this call</p>
//                     </div>
//                     <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
//                         <X size={20} className="text-[#667085]" />
//                     </button>
//                 </div>

//                 <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">

//                     {/* Caller Information Section (Same as before) */}
//                     <div className="p-5 border border-[#EAECF0] rounded-[20px] space-y-5">
//                         <h3 className="text-sm font-bold text-[#101828]">Caller Information</h3>
//                         <div className="grid grid-cols-2 gap-y-5">
//                             <InfoItem icon={<User size={18} />} label="Name" value={callData.name} />
//                             <InfoItem icon={<Phone size={18} />} label="Phone Number" value={callData.phone} />
//                             <InfoItem icon={<Calendar size={18} />} label="Date" value="Dec 22" />
//                             <InfoItem icon={<Clock size={18} />} label="Time & Duration" value={`2:30 PM (${callData.duration})`} />
//                             <InfoItem icon={<Mail size={18} />} label="Email" value="john.smith@email.com" />
//                             <InfoItem icon={<Phone size={18} />} label="Preferred Contact" value="Phone" />
//                         </div>
//                     </div>

//                     {/* Tabs Navigation */}
//                     <div className="bg-[#F2F4F7] p-1 rounded-xl flex gap-1">
//                         {['Transcript', 'Voice Recording', 'Appointment'].map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === tab
//                                     ? 'bg-white text-[#101828] shadow-sm'
//                                     : 'text-[#667085] hover:text-[#101828]'
//                                     }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Tab Content Area */}
//                     <div className="border border-[#EAECF0] rounded-[20px] p-5 min-h-[300px]">

//                         {/* 1. Transcript Tab */}
//                         {activeTab === 'Transcript' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-sm font-bold text-[#101828]">Call Transcript</h3>
//                                 <div className="space-y-4 text-xs">
//                                     <div className="bg-[#EFF8FF] p-3 rounded-2xl rounded-tl-none border border-[#B2DDFF] max-w-[85%]">
//                                         <p className="font-bold text-[#175CD3] mb-1">AI</p>
//                                         <p className="text-[#175CD3]">Hello! Thank you for calling. How can I help you today?</p>
//                                     </div>
//                                     <div className="flex justify-end">
//                                         <div className="bg-[#F9FAFB] p-3 rounded-2xl rounded-tr-none border border-[#EAECF0] max-w-[85%]">
//                                             <p className="font-bold text-[#344054] mb-1 text-right">Caller</p>
//                                             <p className="text-[#344054]">Hi, I'd like to schedule an appointment for a consultation.</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* 2. Voice Recording Tab (Based on image_7db611.png) */}
//                         {activeTab === 'Voice Recording' && (
//                             <div className="space-y-8">
//                                 <h3 className="text-sm font-bold text-[#101828]">Voice Recording</h3>

//                                 <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl p-6">
//                                     <div className="flex items-center gap-4 mb-6">
//                                         <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#EAECF0] rounded-full shadow-sm text-[#101828] hover:bg-gray-50 transition-colors">
//                                             <Play size={20} fill="currentColor" />
//                                         </button>
//                                         <div className="flex-1 space-y-1">
//                                             <div className="flex justify-between text-[11px] text-[#667085] font-medium">
//                                                 <span>0 sec</span>
//                                                 <span>4:12</span>
//                                             </div>
//                                             <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden">
//                                                 <div className="h-full bg-[#2E68FF] w-[30%]"></div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex justify-between items-end">
//                                         <div>
//                                             <p className="text-[11px] text-[#667085]">Quality: <span className="text-[#101828] font-semibold">HD Audio</span></p>
//                                             <p className="text-[11px] text-[#667085]">Format: <span className="text-[#101828] font-semibold">MP3</span></p>
//                                         </div>
//                                         <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D5DD] rounded-lg text-xs font-semibold text-[#344054] hover:bg-gray-50">
//                                             <Download size={16} /> Download
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4 border-t border-[#EAECF0] pt-6">
//                                     <div>
//                                         <p className="text-[11px] text-[#667085]">Recording Started</p>
//                                         <p className="text-sm font-semibold text-[#101828]">Dec 22, 2:30 PM</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[11px] text-[#667085]">Duration</p>
//                                         <p className="text-sm font-semibold text-[#101828]">4m 12s</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* 3. Appointment Tab (Based on image_7db613.png) */}
//                         {activeTab === 'Appointment' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-sm font-bold text-[#101828]">Appointment Details</h3>

//                                 <div className="space-y-5">
//                                     <div className="flex items-start gap-4">
//                                         <div className="mt-1 text-[#98A2B3]"><Calendar size={20} /></div>
//                                         <div>
//                                             <p className="text-[11px] text-[#98A2B3] font-medium">Service</p>
//                                             <p className="text-sm font-bold text-[#101828]">Consultation</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-start gap-4">
//                                         <div className="mt-1 text-[#98A2B3]"><Clock size={20} /></div>
//                                         <div>
//                                             <p className="text-[11px] text-[#98A2B3] font-medium">Date & Time</p>
//                                             <p className="text-sm font-bold text-[#101828]">Dec 23, 2024 at 2:00 PM</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-start gap-4">
//                                         <div className="mt-1 text-[#98A2B3]"><MapPin size={20} /></div>
//                                         <div>
//                                             <p className="text-[11px] text-[#98A2B3] font-medium">Location</p>
//                                             <p className="text-sm font-bold text-[#101828]">123 Main Street, Suite 100, New York, NY 10001</p>
//                                         </div>
//                                     </div>

//                                     <div className="bg-[#EFF8FF] border border-[#B2DDFF] rounded-xl p-4 mt-4">
//                                         <p className="text-xs font-bold text-[#175CD3] mb-1">Notes</p>
//                                         <p className="text-xs text-[#175CD3] leading-relaxed">
//                                             Client requested afternoon appointment. Prefers in-person consultation.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper Component for Info Grid
// const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
//     <div className="flex items-start gap-3">
//         <div className="mt-1 text-[#98A2B3]">{icon}</div>
//         <div>
//             <p className="text-[11px] text-[#667085]">{label}</p>
//             <p className="text-sm font-bold text-[#101828]">{value}</p>
//         </div>
//     </div>
// );

// export default CallModal;


import React, { useState } from 'react';
import {
    X, User, Phone, Calendar, Clock, Download
} from 'lucide-react';
import type { Call, CallStatus } from '../../Interface/User';
import { useTranslation } from 'react-i18next';

type ModalTab = 'transcript' | 'recording' | 'appointment';

interface CallModalProps {
    isOpen: boolean;
    onClose: () => void;
    callData: Call | null;
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, callData }) => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState<ModalTab>('transcript');

    if (!isOpen || !callData) return null;

    const getStatusStyle = (status: CallStatus) => {
        switch (status) {
            case 'completed': return 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]';
            case 'failed': return 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
            case 'in_progress': return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
            default: return 'bg-[#F2F4F7] text-[#344054] border-[#EAECF0]';
        }
    };
    
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return t('callLogs.durationFormat', { minutes, seconds: remainingSeconds });
    };

    const dateLocale = i18n.language?.startsWith('de') ? 'de-DE' : 'en-US';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(dateLocale, {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    const tabs: { id: ModalTab; label: string }[] = [
        { id: 'transcript', label: t('callModal.tabTranscript') },
        { id: 'recording', label: t('callModal.tabVoiceRecording') },
        { id: 'appointment', label: t('callModal.tabAppointment') },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 pb-2 flex justify-between items-start shrink-0">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-[#101828]">{t('callModal.title')}</h2>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(callData.status)}`}>
                                {callData.status}
                            </span>
                        </div>
                        <p className="text-sm text-[#667085] mt-1">{t('callModal.subtitle')}</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                        <X size={20} className="text-[#667085]" />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">

                    {/* Caller Information Section */}
                    <div className="p-5 border border-[#EAECF0] rounded-[20px] space-y-5">
                        <h3 className="text-sm font-bold text-[#101828]">{t('callModal.callerInformation')}</h3>
                        <div className="grid grid-cols-2 gap-y-5">
                            {/* Note: API calls don't have 'Name' and 'Email' explicitly yet, using placeholders or available data */}
                            <InfoItem icon={<User size={18} />} label={t('callModal.labelCallerId')} value={callData.caller_number} />
                            <InfoItem icon={<Phone size={18} />} label={t('callModal.labelPhoneNumber')} value={callData.caller_number} /> 
                            <InfoItem icon={<Calendar size={18} />} label={t('callModal.labelDate')} value={new Date(callData.created_at).toLocaleDateString(dateLocale)} />
                            <InfoItem icon={<Clock size={18} />} label={t('callModal.labelTimeDuration')} value={`${new Date(callData.created_at).toLocaleTimeString(dateLocale, {hour: '2-digit', minute:'2-digit'})} (${formatDuration(callData.duration)})`} />
                            {/* <InfoItem icon={<Mail size={18} />} label="Email" value="N/A" /> */}
                            <InfoItem icon={<Phone size={18} />} label={t('callModal.labelCallId')} value={callData.call_id} />
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="bg-[#F2F4F7] p-1 rounded-xl flex gap-1 shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === tab.id
                                    ? 'bg-white text-[#101828] shadow-sm'
                                    : 'text-[#667085] hover:text-[#101828]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="border border-[#EAECF0] rounded-[20px] p-5 min-h-[300px]">

                        {/* 1. Transcript Tab */}
                        {activeTab === 'transcript' && (
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-[#101828]">{t('callModal.callTranscript')}</h3>
                                <div className="space-y-4 text-xs">
                                    {callData.transcript && callData.transcript.items ? (
                                        callData.transcript.items.map((item) => {
                                            if (item.type === 'message' && item.role && item.content) {
                                                const isAI = item.role === 'assistant';
                                                return (
                                                    <div key={item.id} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                                                        <div className={`p-3 rounded-2xl border max-w-[85%] ${
                                                            isAI 
                                                            ? 'bg-[#EFF8FF] rounded-tl-none border-[#B2DDFF]' 
                                                            : 'bg-[#F9FAFB] rounded-tr-none border-[#EAECF0]'
                                                        }`}>
                                                            <p className={`font-bold mb-1 ${isAI ? 'text-[#175CD3]' : 'text-[#344054] text-right'}`}>
                                                                {isAI ? t('callModal.roleAi') : t('callModal.roleCaller')}
                                                            </p>
                                                            <p className={isAI ? 'text-[#175CD3]' : 'text-[#344054]'}>
                                                                {item.content.join(' ')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        <p className="text-gray-500 italic">{t('callModal.noTranscript')}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 2. Voice Recording Tab */}
                        {activeTab === 'recording' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold text-[#101828]">{t('callModal.voiceRecording')}</h3>

                                <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl p-6">
                                    {callData.recording_url ? (
                                        <div className="flex flex-col gap-4">
                                            <audio controls className="w-full">
                                                <source src={callData.recording_url} type="audio/ogg" />
                                                {t('callModal.audioNotSupported')}
                                            </audio>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">{t('callModal.noRecording')}</p>
                                    )}

                                    {callData.recording_url && (
                                        <div className="flex justify-between items-end mt-4">
                                            <div>
                                                <p className="text-[11px] text-[#667085]">{t('callModal.formatLabel')} <span className="text-[#101828] font-semibold">OGG/MP3</span></p>
                                            </div>
                                            <a 
                                                href={callData.recording_url} 
                                                download 
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D5DD] rounded-lg text-xs font-semibold text-[#344054] hover:bg-gray-50 cursor-pointer"
                                            >
                                                <Download size={16} /> {t('callModal.download')}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-[#EAECF0] pt-6">
                                    <div>
                                        <p className="text-[11px] text-[#667085]">{t('callModal.recordingStarted')}</p>
                                        <p className="text-sm font-semibold text-[#101828]">{callData.started_at ? formatDate(callData.started_at) : t('common.na')}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#667085]">{t('callLogs.columns.duration')}</p>
                                        <p className="text-sm font-semibold text-[#101828]">{formatDuration(callData.duration)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. Appointment Tab */}
                        {activeTab === 'appointment' && (
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-[#101828]">{t('callModal.appointmentDetails')}</h3>
                                {/* 
                                    Note: API Response doesn't explicitly have appointment details yet. 
                                    Showing placeholder or derived data if `summary` contains it.
                                */}
                                <div className="space-y-5">
                                    {callData.summary ? (
                                        <div className="bg-[#EFF8FF] border border-[#B2DDFF] rounded-xl p-4">
                                            <p className="text-xs font-bold text-[#175CD3] mb-1">{t('callModal.callSummary')}</p>
                                            <p className="text-xs text-[#175CD3] leading-relaxed">
                                                {callData.summary}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">{t('callModal.noAppointmentDetails')}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Info Grid
const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 text-[#98A2B3]">{icon}</div>
        <div>
            <p className="text-[11px] text-[#667085]">{label}</p>
            <p className="text-sm font-bold text-[#101828]">{value}</p>
        </div>
    </div>
);

export default CallModal;