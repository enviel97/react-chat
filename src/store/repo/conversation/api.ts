import client from "@core/api";
import {
  CONVERSATION_ADD_MEMBERS,
  CONVERSATION_CREATE_SINGLE,
  CONVERSATION_GET_LIST,
  CONVERSATION_LEAVE,
  CONVERSATION_REMOVE_MEMBERS,
} from "@store/common/repo";

export const getConversations = async (type: "direct" | "group") => {
  const response = await client.get<any, Response<Conversation[]>>(
    CONVERSATION_GET_LIST,
    { params: { type } }
  );
  return response;
};

export const createConversation = async (
  conversation: RequestCreateConversation
) => {
  const response = await client.post<
    RequestCreateConversation,
    Response<Conversation>
  >(`${CONVERSATION_CREATE_SINGLE}`, conversation);

  if (response.data) return response;
  throw new Error("Internal Server Error");
};

export const addMembersToConversation = async (
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

export const removeMembersToConversation = async (
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

export const leaveConversation = async (conversationId: string) => {
  const response = await client.delete<string, Response<Conversation>>(
    CONVERSATION_LEAVE,
    { pathVariable: { id: conversationId } }
  );
  if (response.data) return response;
  throw new Error(response.message);
};
