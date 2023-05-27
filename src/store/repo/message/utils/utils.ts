import string from "@utils/string";
import moment from "moment";

const isTemp = (message: any) => {
  const id = string.getId(message);
  return id.includes("Temp");
};

interface MessageCreateTemp {
  tempId: string;
  conversationId: string;
  message?: string;
  attachments?: File[];
}
const createTemp = ({
  tempId,
  conversationId,
  message,
  attachments,
}: MessageCreateTemp): IMessage => {
  const time = moment().toISOString();
  return {
    conversationId: conversationId,
    content: message,
    author: "",
    createdAt: time,
    updatedAt: time,
    action: "Seen",
    _id: tempId,
    attachments: attachments?.map((file) => ({
      _id: string.genId("Temp"),
      publicId: URL.createObjectURL(file),
      type: file.type,
    })),
  } as any;
};

const messageUtils = {
  isTemp,
  createTemp,
};

export default messageUtils;
