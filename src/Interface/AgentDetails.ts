export interface Agent {
  id: number;
  phone_number: string;
  agent_name: string;
  system_prompt: string;
  //   voice_type: string;
  voice_type: "male" | "female" | "non-binary";
  language: string;
  industry: string;
  is_active: boolean;
  owner_name: string;
  total_calls: number;
  completed_calls: number;
  unanswered_calls: number;
  avg_duration: number;
  avatar_url: string;
  avatar_presigned_url: string;
  call_stats: CallStats;
}

export interface CallLog {
  id: number;
  created_at: string;
  ended_at: string | null;
  transcript: string;
  recording_url: string;
}

export interface CallStats {
  total_calls: number;
  completed_calls: number;
  unanswered_calls: number;
  avg_duration: number;
  total_duration?: number;
  first_call_at?: string | null;
  last_call_at?: string | null;
}
