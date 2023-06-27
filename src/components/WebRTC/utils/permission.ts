import { safeLog } from "@core/api/utils/logger";
import { toast } from "react-toastify";
interface DevicePermission {
  video?: boolean;
  audio?: boolean;
}
const DevicesConfig = Object.freeze({
  VideoCall: { video: true, audio: true },
  PhoneCall: { video: false, audio: true },
});

/**
 * Check devices permission, if haven't
 * all return undefine
 * @returns {MediaStream} microphone and video stream
 */
export const devicesPermission = async (
  type: CallType
): Promise<MediaStream | undefined> => {
  return await navigator.mediaDevices
    .getUserMedia(DevicesConfig[type])
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

export const devicePermission = async ({
  audio = false,
  video = false,
}: DevicePermission): Promise<MediaStream | undefined> => {
  return await navigator.mediaDevices
    .getUserMedia({ video: video, audio: audio })
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
