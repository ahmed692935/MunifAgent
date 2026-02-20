import api from "./axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL as string;

// Submit business detail
export const businessDetail = async (token: string, data: any) => {
  const response = await api.post(`${API_URL}/submit-business-details`, data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// User Dashboard Overview
export const dashboardOverview = async (token: string) => {
  const response = await api.get(`${API_URL}/dashboard/overview`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// User Plan usage
export const planUsage = async (token: string) => {
  const response = await api.get(`${API_URL}/dashboard/plan-usage`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// User Dashboard recent-action
export const recentAction = async (token: string) => {
  const response = await api.get(`${API_URL}/dashboard/recent-actions`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};


// get my-agent
export const getMyAgent = async (token: string) => {
  // const response = await api.get(`${API_URL}/user/my-agent`, {
  const response = await api.get(`${API_URL}/agents`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// update my-agent
export const putMyAgent = async (token: string, agentId: number, formData: FormData) => {
  const response = await api.put(`${API_URL}/agents/${agentId}`, formData, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// get User detail
export const userProfile = async (token: string) => {
  const response = await api.get(`${API_URL}/user-profile`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// get Agent Calls history
export const agentCalls = async (token: string, agentId: number) => {
  const response = await api.get(`${API_URL}/agents/${agentId}/calls`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// get Calls history
export const getCalls = async (token: string) => {
  const response = await api.get(`${API_URL}/calls`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// Google Calendar Login 
export const getGoogleAuth = async (token: string) => {
  const response = await api.get(
    `${API_URL}/google/auth/login`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

// Outlook Calendar 
export const outlookCalendar = async (token: string, userId: number) => {
  const response = await api.get(
    `${API_URL}/calendar/outlook/auth`,
    {
      params: { 
        user_id: userId 
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

// Calendar Status
export const calendarStatus = async (token: string) => {
  const response = await api.get(
    `${API_URL}/calendar/status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};