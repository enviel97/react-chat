import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_REMOVE_MEMBERS } from "@store/common/repo";

const removeMembersToConversation = async (
  conversation: RequestDeleteMemberConversation
) => {
  const response = await client.delete<
    RequestDeleteMemberConversation,
    Response<Conversation>
  >(CONVERSATION_REMOVE_MEMBERS, {
    pathVariable: {
      id: conversation.conversationId,
      userId: conversation.idParticipant,
    },
  });

  if (response.data) return response;
  throw new Error(response.message);
};

const fetchDeleteMember = createAsyncThunk(
  "conversation/delete/members",
  async (req: RequestDeleteMemberConversation) =>
    await removeMembersToConversation(req)
);

export default fetchDeleteMember;
