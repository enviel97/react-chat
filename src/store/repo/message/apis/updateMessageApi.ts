import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_UPDATE } from "@store/common/repo";
import { RootState } from "@store/index";
import { updateLastMessage } from "@store/slices/conversations";

const updateMessage = async (req: RequestEditMessage) => {
  const { conversationId, messageId, content } = req;
  const response = await client.put<any, Response<ResponseEditMessage>>(
    MESSAGE_UPDATE,
    { content: content },
    {
      pathVariable: {
        conversationId: conversationId,
        messageId: messageId,
      },
    }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

const fetchEditMessages = createAsyncThunk(
  "messages/edit",
  async (request: RequestEditMessage, { dispatch, getState }) => {
    const result = await updateMessage(request);
    if (result.data) {
      const state = getState() as RootState;
      const type = state.ui.selectedConversationType;
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data.lastMessage,
          type,
        })
      );
    }

    return result;
  }
);

export default fetchEditMessages;
