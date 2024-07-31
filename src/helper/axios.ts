import axios, { AxiosInstance } from "axios";
import { baseURL } from "./config";

// Buat instance axios
export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Fungsi untuk mendapatkan token dari localStorage
const getAccessToken = () => localStorage.getItem("token");
const setAccessToken = (token: string) => localStorage.setItem("token", token);

// Tambahkan interceptor untuk menyisipkan Bearer Token ke dalam header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Variabel untuk menangani permintaan refresh token
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Fungsi untuk refresh token
const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      baseURL + "/auth/refreshToken",
      {},
      { withCredentials: true }
    );
    const newToken = response.data.data.token;
    setAccessToken(newToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;
    return newToken;
  } catch (error) {
    processQueue(error, null);
    localStorage.clear();
    throw error;
  }
};

// Tambahkan interceptor untuk menangani refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
