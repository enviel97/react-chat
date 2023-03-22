import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_LEAVE } from "@store/common/repo";

const leaveConversation = async (conversationId: string) => {
  const response = await client.delete<string, Response<Conversation>>(
    CONVERSATION_LEAVE,
    { pathVariable: { id: conversationId } }
  );
  if (response.data) return response;
  throw new Error(response.message);
};

const fetchLeaveConversation = createAsyncThunk(
  "conversation/leave/members",
  async (conversationId: string) => await leaveConversation(conversationId)
);

export default fetchLeaveConversation;
