export interface AgentFormData {
  // agent_image?: string | File;
  agent_image?: FileList | string;
  agent_name: string;
  phone_number: string;
  system_prompt: string;
  industry: string;
  language: string;
  business_name: string;
  voice_type: "male" | "female" | "non-binary";
}

// export interface AgentType {
//   id: number;
//   image: string;
//   name: string;
//   phone: string;
//   business: string;
//   prompt: string;
// }

export interface AgentType {
  id: number;
  avatar_url: string;
  agent_name: string;
  phone_number: string;
  owner_name: string;
  system_prompt: string;
  language: string;
  industry: string;
  voice_type: "male" | "female" | "non-binary";
}
