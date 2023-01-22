import { createSelector } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import { ConversationState } from "@store/slices/state/conversation";
import conversationsAdapter from "../adapter/conversation.adapter";
import groupConversationsAdapter from "../adapter/groupConversation.adapter";

const {
  selectById: selectDirectConversationById,
  selectAll: selectAllDirectConversations,
} = conversationsAdapter.getSelectors((rootState: any) => {
  const state: ConversationState = rootState[SliceName.conversation];
  return state.direct;
});

const {
  selectById: selectGroupConversationById,
  selectAll: selectAllGroupConversations,
} = groupConversationsAdapter.getSelectors((rootState: any) => {
  const state: ConversationState = rootState[SliceName.conversation];
  return state.group;
});

export const selectAllConversation = createSelector(
  selectAllDirectConversations,
  selectAllGroupConversations,
  (state: RootState) => state.conversation.type,
  (directs, groups, type) => {
    if (type === "direct") return directs;
    return groups;
  }
);

export const selectConversationById = createSelector(
  selectDirectConversationById,
  selectGroupConversationById,
  (direct, group) => {
    return direct ?? group;
  }
);
