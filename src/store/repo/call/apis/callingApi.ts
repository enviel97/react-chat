import { createAsyncThunk } from "@reduxjs/toolkit";
import { devicePermission } from "../utils/permission";

interface CallingApiProps {
  receiver: string;
  camera?: boolean;
  microphone?: boolean;
}

const callingApi = createAsyncThunk(
  "call/calling",
  async ({ receiver, camera, microphone }: CallingApiProps, { getState }) => {
    const stream = await devicePermission({ camera, microphone });
    if (!stream) return;
    return { stream, receiver };
  }
);

export default callingApi;
