// export interface Agent {
//   id: number;
//   phone_number: string;
//   agent_name: string;
//   system_prompt: string;
//   //   voice_type: string;
//   voice_type: "male" | "female" | "non-binary";
//   language: string;
//   industry: string;
//   is_active: boolean;
//   owner_name: string;
//   total_calls: number;
//   completed_calls: number;
//   unanswered_calls: number;
//   avg_duration: number;
//   avatar_url: string;
//   avatar_presigned_url: string;
//   call_stats: CallStats;
// }

// export interface CallLog {
//   id: number;
//   created_at: string;
//   ended_at: string | null;
//   transcript: string;
//   recording_url: string;
// }

// export interface CallStats {
//   total_calls: number;
//   completed_calls: number;
//   unanswered_calls: number;
//   avg_duration: number;
//   total_duration?: number;
//   first_call_at?: string | null;
//   last_call_at?: string | null;
// }

export interface TranscriptItem {
  id: string;
  // role?: "assistant" | "user";
  // type: string;
  // content?: string[];
  // metrics?: Record<string, any>;
  interrupted?: boolean;
  transcript_confidence?: number;
  new_agent_id?: string;
  type: "message" | string;
  role: "assistant" | "user" | string;
  content: string[];
}

export interface Transcript {
  items: TranscriptItem[];
}

export interface CallLog {
  id: number;
  call_id: string;
  caller_number: string;
  status: string;
  duration: number | null;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  transcript: Transcript | null;
  transcript_url: string | null;
  transcript_blob: string | null;
  recording_url: string | null;
  recording_blob: string | null;
  recording_presigned_url: string | null;
  transcript_presigned_url: string | null;
}

export interface CallsData {
  data: CallLog[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CallStats {
  total_calls: number;
  completed_calls: number;
  unanswered_calls: number;
  avg_duration: number;
  total_duration: number;
  first_call_at: string | null;
  last_call_at: string | null;
}

export interface Agent {
  id: number;
  phone_number: string;
  agent_name: string;
  system_prompt: string;
  voice_type: string;
  owner_name: string;
  avatar_url: string;
  avatar_presigned_url: string;
  language: string;
  industry: string;
  admin_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  call_stats: CallStats;
  calls: CallsData;
}
