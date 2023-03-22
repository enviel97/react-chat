import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_ADD_MEMBERS } from "@store/common/repo";

const addMembersToConversation = async (
  conversation: RequestAddMemberConversation
) => {
  const response = await client.post<
    RequestCreateConversation,
    Response<Conversation>
  >(
    CONVERSATION_ADD_MEMBERS,
    { idParticipants: conversation.idParticipant },
    { pathVariable: { id: conversation.conversationId } }
  );
  if (response.data) return response;
  throw new Error(response.message);
};

const fetchAddMembers = createAsyncThunk(
  "conversation/add/members",
  async (req: RequestAddMemberConversation) =>
    await addMembersToConversation(req)
);

export default fetchAddMembers;
