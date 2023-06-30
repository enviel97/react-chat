import { safeLog } from "@core/api/utils/logger";
import { toast } from "react-toastify";

interface DevicePermission {
  camera?: boolean;
  microphone?: boolean;
}

/**
 * Check devices permission, if haven't
 * all return undefine
 * @returns {MediaStream} microphone and video stream
 */
export const devicePermission = async ({
  camera = true,
  microphone = false,
}: DevicePermission): Promise<MediaStream | undefined> => {
  return await navigator.mediaDevices
    .getUserMedia({ video: camera, audio: microphone })
    .then((userDevices) => {
      if (!userDevices.active) return undefined;
      return userDevices;
    })
    .catch((error: DOMException) => {
      toast.error(`[${error.name}]:${error.message}`);
      safeLog(error);
      return undefined;
    });
};
