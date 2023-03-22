import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_DELETE, MESSAGE_GET_LIST } from "@store/common/repo";
import { RootState } from "@store/index";
import { updateLastMessage } from "@store/slices/conversations";

const deleteMessage = async (req: RequestDeleteMessage) => {
  const { conversationId, messageId } = req;
  const response = await client.delete<any, Response<ResponseDeleteMessage>>(
    MESSAGE_DELETE,
    { pathVariable: { conversationId, messageId } }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

const fetchDeleteMessages = createAsyncThunk(
  "messages/delete",
  async (request: RequestDeleteMessage, { dispatch, getState }) => {
    const result = await deleteMessage(request);
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

export default fetchDeleteMessages;
