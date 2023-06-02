import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_UPDATE } from "@store/common/repo";
import type { RootState } from "@store/index";
import { updateLastMessage } from "@store/slices/conversations";

const updateMessage = async (req: RequestEditMessage) => {
  const { conversationId, messageId, content } = req;
  const response = await client.put<any, Response<ActionEditParams>>(
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
  async (request: RequestEditMessage, { getState, dispatch }) => {
    const result = await updateMessage(request);
    if (result.data) {
      const state = getState() as RootState;
      const type = state.ui.selectedConversationType;
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data,
          type,
        })
      );
      return result;
    }
    return Promise.reject(result.message ?? "Interval server error");
  }
);

export default fetchEditMessages;
