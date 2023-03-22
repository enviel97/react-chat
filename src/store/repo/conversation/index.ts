import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import {
  addMembersToConversation,
  createConversation,
  getConversations,
  leaveConversation,
  removeMembersToConversation,
} from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/list",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    const result = await getConversations(type);
    return {
      conversations: result,
      type,
    };
  }
);

export const fetchAddConversation = createAsyncThunk(
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

export const fetchAddMembers = createAsyncThunk(
  "conversation/add/members",
  async (req: RequestAddMemberConversation) =>
    await addMembersToConversation(req)
);

export const fetchDeleteMember = createAsyncThunk(
  "conversation/delete/members",
  async (req: RequestDeleteMemberConversation) =>
    await removeMembersToConversation(req)
);

export const fetchLeaveConversation = createAsyncThunk(
  "conversation/leave/members",
  async (conversationId: string) => await leaveConversation(conversationId)
);
