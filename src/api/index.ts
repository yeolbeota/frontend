import axios, { AxiosError } from "axios";

export const apiInstance = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

async function refresh() {
  await apiInstance()
    .get("/auth/refresh")
    .then((res) => localStorage.setItem("token", res.data.accessToken))
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        localStorage.setItem("token", "");
        window.location.href = "/login";
      }
    });
}

export function authInstance() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let originalRequest: Array<{
    url: string;
    method: string;
    data: string;
  }> = [];

  instance.interceptors.request.use(async (config) => {
    if (localStorage.getItem("token") === "") await refresh();
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    originalRequest.push({
      url: config.url || "",
      method: config.method || "",
      data: JSON.stringify(config.data) || "",
    });
    return config;
  });

  instance.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        return await refresh()
          .then(async (res) => {
            const data = await authInstance().request({
              method: originalRequest[0].method,
              url: originalRequest[0].url,
              data: originalRequest[0].data,
            });
            originalRequest = [];
            return data;
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              localStorage.setItem("token", "");
              window.location.href = "/login";
            }
          });
      }
      return error;
    }
  );

  return instance;
}
