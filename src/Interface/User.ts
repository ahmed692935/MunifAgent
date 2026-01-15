// CallLogs Interface
// export type CallStatus = 'BOOKED' | 'SPAM' | 'QUERY' | 'MISSED';

// export interface CallLog {
//     id: number;
//     name: string;
//     phone: string;
//     status: CallStatus;
//     dateTime: string;
//     duration: string;
//     isCompany?: boolean;
// }


// CallLogs Interface

export interface AgentCallsResponse {
    success: boolean;
    agent_id: number;
    agent_name: string;
    phone_number: string;
    pagination: Pagination;
    calls: Call[];
}

export interface Pagination {
    page: number;
    page_size: number;
    total: number;
    completed_calls: number;
    not_completed_calls: number;
}

export interface Call {
    id: number;
    agent_id: number;
    agent_name: string;
    call_id: string;
    caller_number: string;
    status: CallStatus;
    duration: number;
    transcript: Transcript | null;
    summary: string | null;
    recording_url: string | null;
    created_at: string;
    started_at: string;
    ended_at: string;
    transcript_url: string | null;
    transcript_blob: string | null;
    recording_blob: string | null;
    events_log: any[]; // Using any[] for complex nested structure like events if strict typing isn't immediately required, or define EventLog interface if needed.
    agent_events: any[];
    recording_blob_data: any | null;
    recording_size: any | null;
    recording_content_type: string | null;
    transcript_text: string | null;
    has_recording: boolean;
    recording_presigned_url?: string;
    transcript_presigned_url?: string;
}

export interface Transcript {
    items: TranscriptItem[];
}

export interface TranscriptItem {
    id: string;
    type: string;
    role?: 'assistant' | 'user';
    content?: string[];
    metrics?: any;
    interrupted?: boolean;
    transcript_confidence?: number;
    new_agent_id?: string;
    name?: string;
    call_id?: string;
    arguments?: string;
    output?: string;
    is_error?: boolean;
    extra?: any;
}


export interface AgentsResponse {
    success: boolean;
    data: {
        agents: Agent[];
        total: number;
        page: number;
        page_size: number;
        total_pages: number;
    };
}

export interface Agent {
    id: number;
    phone_number: string;
    agent_name: string;
    system_prompt: string;
    voice_type: string;
    language: string;
    industry: string | null;
    avatar_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    owner_name: string;
    owner_email: string;
    business_hours_start: string | null;
    business_hours_end: string | null;
    allowed_minutes: number;
    used_minutes: number;
    total_calls: number;
    completed_calls: number;
    unanswered_calls: number;
    avg_duration: number;
    total_duration: number;
    last_call_at: string | null;
    avatar_presigned_url: string;
    minutes_info: {
        allowed_minutes: number;
        used_minutes: number;
        remaining_minutes: number;
        percentage_used: number;
        can_accept_calls: boolean;
    };
}

export type CallStatus = 'completed' | 'in_progress' | 'failed' | 'missed';
