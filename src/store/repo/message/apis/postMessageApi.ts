import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_POST } from "@store/common/repo";
import { RootState } from "@store/index";
import { updateLastMessage } from "@store/slices/conversations";

const postMessage = async (req: RequestSendMessage) => {
  const response = await client.post<any, Response<Message>>(
    MESSAGE_POST,
    {
      content: req.message,
    },
    { pathVariable: { conversationId: req.conversationId } }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

const fetchAddMessages = createAsyncThunk(
  "messages/create",
  async (request: RequestSendMessage, { dispatch, getState }) => {
    const result = await postMessage(request);
    if (result.data) {
      const state = getState() as RootState;
      const type = state.ui.selectedConversationType;
      const message = result.data;
      dispatch(
        updateLastMessage({
          conversationId: message.conversationId,
          message,
          type,
        })
      );
    }

    return result;
  }
);
export default fetchAddMessages;
