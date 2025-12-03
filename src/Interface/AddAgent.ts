export interface AgentFormData {
  // agent_image?: string | File;
  agent_image?: FileList | string;
  agent_name: string;
  phone_number: string;
  system_prompt: string;
  industry: string;
  language: string;
  business_name: string;
  owner_email: string;
  business_hours_start: string;
  business_hours_end: string;
  allowed_minutes: number;
  voice_type: "male" | "female" | "non-binary";
}

export interface AgentType {
  id: number;
  // avatar_url: string;
  avatar_presigned_url: string;
  agent_name: string;
  phone_number: string;
  owner_name: string;
  system_prompt: string;
  language: string;
  industry: string;
  owner_email: string;
  business_hours_start: string;
  business_hours_end: string;
  allowed_minutes: number;
  voice_type: "male" | "female" | "non-binary";
}

export interface AnalyticsData {
  total_calls: number;
  total_agents: number;
}
