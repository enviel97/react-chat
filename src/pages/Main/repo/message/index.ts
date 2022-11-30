import client from "@core/api";
import { MESSAGE_POST } from "@pages/Main/common/repo";

export const postMessage = async (req: RequestSendMessage) => {
  const response = await client.post<any, Response<Message>>(MESSAGE_POST, {
    conversationId: req.conversationId,
    content: req.message,
  });
  if (response.data) return response.data;
  throw new Error("Internal Server Error");
};
