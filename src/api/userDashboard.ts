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
  const response = await api.get(`${API_URL}/user/my-agent`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// update my-agent
export const putMyAgent = async (token: string, formData: FormData) => {
  const response = await api.put(`${API_URL}/user/my-agent`, formData, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data;
};