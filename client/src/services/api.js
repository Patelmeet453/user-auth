import axios from "axios";
import { store } from "../app/store";
import { clearUser } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(clearUser());
    }
    return Promise.reject(err);
  }
);

export default api;
