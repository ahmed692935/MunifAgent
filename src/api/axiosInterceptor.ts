import axios from "axios";

// Global Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// --------------
// RESPONSE INTERCEPTOR
// --------------
api.interceptors.response.use(
  (response) => response, // success ko as-is return karo
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired → logout & redirect
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default api;
