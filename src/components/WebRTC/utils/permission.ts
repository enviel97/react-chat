import { safeLog } from "@core/api/utils/logger";
import { toast } from "react-toastify";
interface DevicePermission {
  camera?: boolean;
}
const NOTIFICATION_DEVICES_ERROR = `You should have camera or microphone to trigger this action`;
/**
 * Check devices permission, if haven't
 * all return undefine
 * @returns {MediaStream} microphone and video stream
 */
export const devicesPermission = async (
  config: DevicePermission
): Promise<MediaStream | undefined> => {
  return await navigator.mediaDevices
    .getUserMedia({ video: config.camera, audio: true })
    .then((userDevices) => {
      if (!userDevices.active) return undefined;
      return userDevices;
    })
    .catch((error: DOMException) => {
      toast.error(NOTIFICATION_DEVICES_ERROR);
      safeLog(error);
      return undefined;
    });
};
