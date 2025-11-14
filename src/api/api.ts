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
