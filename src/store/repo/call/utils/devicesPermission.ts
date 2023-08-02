import { safeLog } from "@core/api/utils/logger";

export interface DevicePermission {
  camera?: boolean;
  microphone?: boolean;
}

/**
 * Check devices permission, if haven't
 * all return undefine
 * @returns {MediaStream} microphone and video stream
 */
export const devicesPermission = async (config: DevicePermission) => {
  return await navigator.mediaDevices
    .getUserMedia({ video: config.camera, audio: true })
    .then((userDevices) => {
      if (!userDevices.active) return Promise.reject("devices-permission");
      return userDevices;
    })
    .catch((error: DOMException) => {
      safeLog(error);
      return Promise.reject("devices-permission");
    });
};
