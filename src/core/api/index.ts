import { baseUrlAPI } from "@common/config.define";
import axios from "axios";
import "@core/utils/api";

const client = axios.create({
  baseURL: baseUrlAPI,
  timeout: 5000, // 5s
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.pathVariable) return config;
  // parse pathName to implement variables
  let currentUrl = config.url ?? "";
  Object.entries(config.pathVariable || {}).forEach(([k, v]) => {
    currentUrl = currentUrl.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    ...config,
    url: currentUrl,
  };
});

client.interceptors.response.use((response) => {
  return response.data;
});

export default client;
