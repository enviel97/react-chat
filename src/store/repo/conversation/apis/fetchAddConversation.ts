import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_CREATE_SINGLE } from "@store/common/repo";
import { RootState } from "@store/index";

const createConversation = async (conversation: RequestCreateConversation) => {
  const response = await client.post<
    RequestCreateConversation,
    Response<Conversation>
  >(CONVERSATION_CREATE_SINGLE, conversation);

  if (response.data) return response;
  throw new Error("Internal Server Error");
};

const fetchAddConversation = createAsyncThunk(
  "conversations/add",
  async (req: RequestCreateConversation, { getState }) => {
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    const result = await createConversation(req);
    return {
      conversation: result,
      type,
    };
  }
);

export default fetchAddConversation;
