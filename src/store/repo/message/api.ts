import client from "@core/api";
import { MESSAGE_GET_LIST, MESSAGE_POST } from "@store/common/repo";

const messageUrl = (conversationId: string, prefix: string) =>
  `conversations/${conversationId}${prefix}`;

export const postMessage = async (req: RequestSendMessage) => {
  const response = await client.post<any, Response<Message>>(
    // `${req.conversationId}${MESSAGE_POST}`,
    messageUrl(req.conversationId, MESSAGE_POST),
    {
      conversationId: req.conversationId,
      content: req.message,
    }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const getMessages = async (id: string) => {
  const response = await client.get<any, Response<Message[]>>(
    messageUrl(id, MESSAGE_GET_LIST)
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const deleteMessage = async (req: RequestDeleteMessage) => {
  const { conversationId, messageId } = req;
  const response = await client.delete<any, Response<Message[]>>(
    messageUrl(conversationId, `${MESSAGE_GET_LIST}/${messageId}`)
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};
