import { DevicesValue } from "@common/helper/breakpoint";
import axios from "axios";
import MobileDetect from "mobile-detect";
import { toast } from "react-toastify";
import { safeLog } from "./utils/logger";
import { isLoginRequired, isServerError } from "./utils/statusValid";
const showToast = (message: string) => {
  const toastId = message.toLowerCase().replaceAll(" ", "");
  if (!toast.isActive(toastId))
    toast.error(message, {
      toastId: toastId,
    });
};
const device = new MobileDetect(window.navigator.userAgent);

const client = axios.create({
  baseURL: device.isPhoneSized(DevicesValue.tablet)
    ? process.env.REACT_APP_API_URL_MOBILE
    : process.env.REACT_APP_API_URL_COMPUTER,
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
        showToast(err.response.data?.message ?? "Internal Server Error");
        return;
      }
      if (isLoginRequired(status)) {
        showToast("You must log in first");
        return;
      }
      showToast(err.response.data?.message ?? "Server not found");
      return;
    } else if (err.request) {
      showToast(err.request.message ?? "Interval Server Error");
      return;
    }
    showToast("Some error occur, we don't known");
    return;
  } catch (error) {
    showToast("Some error occur, we don't known");
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
