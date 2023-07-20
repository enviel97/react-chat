import { createAsyncThunk } from "@reduxjs/toolkit";
import { devicesPermission } from "../utils/devicesPermission";

const localStream = createAsyncThunk("call/localStream", async () => {
  const newStream = await devicesPermission({
    camera: true,
    microphone: true,
  });
  if (!newStream) return Promise.reject("device-unavailable");
  return newStream;
});

export default localStream;
