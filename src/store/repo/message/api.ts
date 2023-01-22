import client from "@core/api";
import { MESSAGE_GET_LIST, MESSAGE_POST } from "@store/common/repo";

const messageUrl = (conversationId: string, prefix: string) =>
  `conversations/${conversationId}${prefix}`;

export const postMessage = async (req: RequestSendMessage) => {
  const response = await client.post<any, Response<Message>>(
    messageUrl(req.conversationId, MESSAGE_POST),
    {
      conversationId: req.conversationId,
      content: req.message,
    }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const getMessages = async (
  id: string,
  options: PaginationOption = {
    limit: 20,
    bucket: 0,
  }
) => {
  const response = await client.get<any, Response<Pagination<Message>>>(
    messageUrl(id, `${MESSAGE_GET_LIST}`),
    { params: options }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const deleteMessage = async (req: RequestDeleteMessage) => {
  const { conversationId, messageId } = req;
  const response = await client.delete<any, Response<ResponseDeleteMessage>>(
    messageUrl(conversationId, `${MESSAGE_GET_LIST}/${messageId}`)
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const updateMessage = async (req: RequestEditMessage) => {
  const { conversationId, messageId, content } = req;
  const response = await client.put<any, Response<ResponseEditMessage>>(
    messageUrl(conversationId, `${MESSAGE_GET_LIST}/${messageId}`),
    { content: content }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};
