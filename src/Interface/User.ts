// Recent Action in User Dashboard
export interface ActionItem {
    id: number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    text: string;
    time: string;
}

// CallLogs Interface
export type CallStatus = 'BOOKED' | 'SPAM' | 'QUERY' | 'MISSED';

export interface CallLog {
    id: number;
    name: string;
    phone: string;
    status: CallStatus;
    dateTime: string;
    duration: string;
    isCompany?: boolean;
}