import { safeLog } from "@core/api/utils/logger";

export enum FACING_MODE {
  WEBCAM = "user",
  CAMERA = "environment",
}

export interface DevicePermission {
  camera?: boolean;
  microphone?: boolean;
}

const SetupTrackConstraints: MediaStreamConstraints = {
  audio: {
    noiseSuppression: true,
    echoCancellation: true,
  },
  video: {
    width: { min: 0, ideal: 1280, max: 1920 },
    height: { min: 0, ideal: 720, max: 1080 },
    frameRate: { ideal: 10, max: 15 },
    aspectRatio: { ideal: 1, max: 320 / 240 },
    facingMode: FACING_MODE.WEBCAM,
  },
};

/**
 * Check devices permission, if haven't
 * all return undefine
 * @returns {MediaStream} microphone and video stream
 * @throws {string} "device-permission"
 */
export async function devicesPermission(): Promise<MediaStream> {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia(
      SetupTrackConstraints
    );
    return localStream;
  } catch (error) {
    safeLog(error);
    return Promise.reject("devices-permission");
  }
}

export const shareScreen = async () => {
  try {
    const localStream = await navigator.mediaDevices.getDisplayMedia(
      SetupTrackConstraints
    );
    return localStream;
  } catch (error) {
    safeLog(error);
    return Promise.reject("devices-sharing");
  }
};
