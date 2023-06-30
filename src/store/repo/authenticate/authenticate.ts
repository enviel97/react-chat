import client from "@core/api";
import { safeLog } from "@core/api/utils/logger";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_STATUS_URL, SIGN_IN_URL, SIGN_UP_URL } from "@store/common/repo";

export const signIn = createAsyncThunk(
  "auth/login",
  async (req: SignInRequest) => {
    const response = await client.post<SignUpRequest, Response<User>>(
      SIGN_IN_URL,
      req
    );
    return {
      message: `Welcome ${response.data?.lastName ?? "user"}`,
      data: response.data,
    };
  }
);

export const signUp = async (req: SignUpRequest) => {
  const response = await client.post<SignUpRequest, Response<User>>(
    SIGN_UP_URL,
    req
  );
  return response;
};

export const authStatus = createAsyncThunk("auth/status", async () => {
  return await client
    .get<any, Response<User>>(AUTH_STATUS_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      safeLog(error);
      return;
    });
});
