import client from "@core/api";
import { USER_GET_SEARCH } from "@store/common/repo";

export const searchUser = async (query: string) => {
  const response = await client.get<any, Response<User[]>>(USER_GET_SEARCH, {
    params: { participant: query },
  });
  if (response.data) return response;
  throw new Error("Internal Server Error");
};
