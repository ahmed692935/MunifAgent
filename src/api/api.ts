import axios from "axios";
import type { SignInFormData, SignUpFormData } from "../Interface/Auth";
import api from "./axiosInterceptor";

// const API_URL = "http://localhost:8080/api";
const API_URL = import.meta.env.VITE_API_URL as string;

export const signupUser = async (data: SignUpFormData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  console.log(response, "respRegister");
  return response.data;
};

export const loginUser = async (data: SignInFormData) => {
  const response = await axios.post(`${API_URL}/login`, data);
  console.log(response, "respLogin");
  return response.data;
};

// get api agents analytical
// export const getAnalyticsDashboard = async (token: string) => {
//   const response = await axios.get(`${API_URL}/analytics`, {
//     headers: {
//       "ngrok-skip-browser-warning": "true",
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   });
//   return response.data;
// };
export const getAnalyticsDashboard = async (token: string) => {
  const response = await api.get(`${API_URL}/analytics`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// Post api agents new agent
export const postAddAgent = async (token: string, formData: FormData) => {
  const response = await api.post(`${API_URL}/agents`, formData, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// get api all agents
export const getAllAgents = async (
  token: string,
  page: number = 1,
  pageSize: number = 5
) => {
  const response = await api.get(
    `${API_URL}/agents?page=${page}&page_size=${pageSize}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export const getAgentById = (token: string, id: string) =>
  api.get(`${API_URL}/agents/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteAgent = async (token: string, id: number) => {
  const response = await api.delete(`${API_URL}/agents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateAgent = async (
  token: string,
  id: number,
  data: FormData
) => {
  const response = await api.put(`${API_URL}/agents/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data", // since we might upload image
    },
  });

  return response.data;
};

export const searchAgentsByOwner = async (token: string, ownerName: string) => {
  const response = await api.get(`${API_URL}/agents/by-owner/${ownerName}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

export const sendResetLink = async (email: string) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

export const resetPasswordAPI = async (data: {
  new_password: string;
  token: string;
}) => {
  const response = await api.post("/reset-password", data);
  return response.data;
};

export const getLanguage = async ({
  language,
  token,
}: {
  language: string;
  token: string;
}) => {
  const response = await api.get(`/voice-samples`, {
    params: { language },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
