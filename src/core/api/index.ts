import axios from "axios";
import { toast } from "react-toastify";
import { safeLog } from "./utils/logger";
import { isServerError } from "./utils/statusValid";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000, // 3s
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});

const errorHandler = (err: any) => {
  try {
    if (err.response) {
      const { status = 500 } = err.response;
      if (isServerError(status)) {
        toast.error(err.response.data?.message ?? "Internal Server Error");
        return;
      }
      toast.error(err.response.data?.message ?? "Server not found");
      return;
    } else if (err.request) {
      toast.error(err.request.message ?? "Bad request error");
      return;
    }
    toast.error("Some error occur, we don't known");
    return;
  } catch (error) {
    toast.error("Some error occur, we don't known");
  } finally {
    safeLog(err);
    return {
      code: err.code,
      message: err.message,
      data: undefined,
    };
  }
};

client.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
}, errorHandler);

client.interceptors.response.use((response) => {
  try {
    return response.data;
  } catch (error) {
    // Error undefine
    return Promise.reject({ message: "Client error" });
  }
}, errorHandler);

export default client;
