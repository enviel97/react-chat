import client from "@core/api";
import {
  CONVERSATION_CREATE_SINGLE,
  CONVERSATION_GET_LIST,
} from "@store/common/repo";

export const getConversations = async () => {
  const response = await client.get<any, Response<Conversation[]>>(
    CONVERSATION_GET_LIST
  );
  return response;
};

export const createConversation = async (
  conversation: RequestCreateConversation
) => {
  const response = await client.post<
    RequestCreateConversation,
    Response<Conversation>
  >(`${CONVERSATION_CREATE_SINGLE}`, conversation);

  if (response.data) return response;
  throw new Error("Interval server error");
};
