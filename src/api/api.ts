import axios from "axios";
import type { SignInFormData, SignUpFormData } from "../Interface/Auth";

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
export const getAnalyticsDashboard = async (token: string) => {
  const response = await axios.get(`${API_URL}/analytics`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

// Post api agents new agent
export const postAddAgent = async (token: string, formData: any) => {
  const response = await axios.post(`${API_URL}/agents`, formData, {
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
  const response = await axios.get(
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
  axios.get(`${API_URL}/agents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
