export interface Agent {
  id: number;
  phone_number: string;
  agent_name: string;
  system_prompt: string;
  voice_type: string;
  language: string;
  industry: string;
  is_active: boolean;
  owner_name: string;
  total_calls: number;
  completed_calls: number;
  unanswered_calls: number;
  avg_duration: number;
}

export interface CallLog {
  id: number;
  created_at: string;
  ended_at: string | null;
  transcript: string;
  recording_url: string;
}
