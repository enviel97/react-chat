// import MobileDetect from "mobile-detect";
// import { DevicesValue } from "@theme/helper/breakpoint";

// const device = new MobileDetect(window.navigator.userAgent);

const isPhoneSized = false; //!device.isPhoneSized(DevicesValue.tablet);

export const baseUrlAPI = isPhoneSized
  ? import.meta.env.VITE_API_URL_MOBILE
  : import.meta.env.VITE_API_URL_COMPUTER;

export const baseUrlSocket =
  (isPhoneSized
    ? import.meta.env.VITE_WEBSOCKET_URL_MOBILE
    : import.meta.env.VITE_WEBSOCKET_URL_COMPUTER) ?? "";
