// import MobileDetect from "mobile-detect";
// import { DevicesValue } from "@common/helper/breakpoint";

// const device = new MobileDetect(window.navigator.userAgent);

const isPhoneSized = false; //!device.isPhoneSized(DevicesValue.tablet);

export const baseUrlAPI = isPhoneSized
  ? process.env.REACT_APP_API_URL_MOBILE
  : process.env.REACT_APP_API_URL_COMPUTER;

export const baseUrlSocket =
  (isPhoneSized
    ? process.env.REACT_APP_WEBSOCKET_URL_MOBILE
    : process.env.REACT_APP_WEBSOCKET_URL_COMPUTER) ?? "";
