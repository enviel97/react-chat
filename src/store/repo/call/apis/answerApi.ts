import { createAsyncThunk } from "@reduxjs/toolkit";
import { devicePermission } from "../utils/permission";

interface CallingApiProps {
  caller: string;
  camera?: boolean;
  microphone?: boolean;
}

const answerApi = createAsyncThunk(
  "call/answer",
  async ({ caller, camera, microphone }: CallingApiProps, { getState }) => {
    const stream = await devicePermission({ camera, microphone });
    if (!stream) return;
    return { stream, caller };
  }
);

export default answerApi;
