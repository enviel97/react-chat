import client from "@core/api";
import { MESSAGE_GET_LIST, MESSAGE_POST } from "@store/common/repo";

export const postMessage = async (req: RequestSendMessage) => {
  const response = await client.post<any, Response<Message>>(MESSAGE_POST, {
    conversationId: req.conversationId,
    content: req.message,
  });
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const getMessages = async (id: string) => {
  const response = await client.get<any, Response<Message[]>>(
    `${MESSAGE_GET_LIST}/${id}`
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};
