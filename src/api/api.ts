import axios from "axios";
import type {
  SignInFormData,
  SignUpFormData,
  AuthResponse,
} from "../Interface/Auth";
import api from "./axiosInterceptor";

// const API_URL = "http://localhost:8080/api";
const API_URL = import.meta.env.VITE_API_URL as string;

export const signupUser = async (data: SignUpFormData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  console.log(response, "respRegister");
  return response.data;
};

export const loginUser = async (
  data: SignInFormData,
): Promise<AuthResponse> => {
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

export const postAddPlan = async (token: string, data: any) => {
  console.log(data);

  const response = await api.post(
    `${API_URL}/create-subscription-plans`,
    data,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return response.data;
};

export const getSubscriptionPlanByUserId = async (
  token: string,
  userId: number,
) => {
  const response = await api.get(`/get-subscription-plans/${userId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

export const updateSubscriptionPlan = async (token: string, data: any) => {
  const response = await api.put(`/update-subscription-plans`, data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

export const deleteSubscriptionPlan = async (token: string, userId: number) => {
  const response = await api.delete(`/delete-subscription-plans/${userId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

// get api all agents
export const getAllAgents = async (
  token: string,
  page: number = 1,
  pageSize: number = 5,
) => {
  const response = await api.get(
    `${API_URL}/agents?page=${page}&page_size=${pageSize}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return response.data;
};

// export const getAgentById = (
//   token: string,
//   id: string,
//   page: number = 1,
//   pageSize: number = 10
// ) =>
//   api.get(`${API_URL}/agents/${id}?page=${page}&page_size=${pageSize}`, {
//     headers: {
//       "ngrok-skip-browser-warning": "true",
//       Authorization: `Bearer ${token}`,
//     },
//   });
export const getAgentById = (
  token: string,
  id: string,
  callsPage: number = 1,
  callsPageSize: number = 10,
) =>
  api.get(
    `${API_URL}/agents/${id}?calls_page=${callsPage}&calls_page_size=${callsPageSize}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const deleteAgent = async (token: string, id: number) => {
  const response = await api.delete(`${API_URL}/agents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateAgent = async (
  token: string,
  id: number,
  data: FormData,
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

export const contactForm = async (token: string, data: any) => {
  const response = await api.post(`${API_URL}/contact-form`, data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const resetAgentMinutes = async (
  token: string,
  agentId: string | number,
) => {
  const response = await api.post(
    `${API_URL}/agents/${agentId}/reset-minutes`,
    {},
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return response.data;
};

// Admin Users Page - Get All Users
export const getUsers = async (token: string) => {
  // const response = await api.get(`${API_URL}/users/list`, {
  const response = await api.get(`${API_URL}/admin/users`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// Add agent page - Get All Users
export const getUsersAgent = async (token: string) => {
  const response = await api.get(`${API_URL}/users/list`, {
    // const response = await api.get(`${API_URL}/admin/users`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// User Admin/User Toggle
export const adminStatus = async (
  token: string,
  userId: number,
  newStatus: boolean,
) => {
  const response = await api.patch(
    `${API_URL}/admin/users/${userId}/admin-status`,
    { is_admin: newStatus }, // Body mein data bhejna 422 error solve kar sakta hai
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return response.data;
};

// User Active/Inactive Toggle
export const userActiveToggle = async (
  token: string,
  userId: number,
  agentId: number,
  isActive: boolean,
) => {
  const response = await api.post(
    `${API_URL}/agents/toggle-status`,
    {
      user_id: userId,
      agent_id: agentId,
      is_active: isActive,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return response.data;
};

// Admin create new user
export const adminCreateUser = async (token: string, data: any) => {
  // data ko second argument (body) ke bajaye params mein pass karein
  const response = await api.post(
    `${API_URL}/admin/create-user`,
    {},
    {
      params: data, // Yeh data ko URL?key=value format mein convert kar dega
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return response.data;
};
