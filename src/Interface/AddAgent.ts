export interface AgentFormData {
  agent_image: string;
  agent_name: string;
  phone_number: string;
  system_prompt: string;
  industry: string;
  language: string;
  business_name: string;
  voice_type: "male" | "female" | "binary";
}
