import client from "@core/api";
import {
  AUTH_STATUS_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "@pages/Auth/common/repo";

export const signIn = async (req: SignInRequest) => {
  const response = await client.post<SignUpRequest, Response<User>>(
    SIGN_IN_URL,
    req
  );
  return {
    message: `Welcome ${response.data?.lastName ?? "user"}`,
    data: response.data,
  };
};

export const signUp = async (req: SignUpRequest) => {
  const response = await client.post<SignUpRequest, Response<User>>(
    SIGN_UP_URL,
    req
  );
  return response.data;
};

export const authStatus = async () => {
  const response = await client.get<any, Response<User>>(AUTH_STATUS_URL);
  return response.data;
};
