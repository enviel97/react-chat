import { createDraftSafeSelector } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import { ConversationState } from "@store/slices/state/conversation";
import conversationsAdapter from "../adapter/conversation.adapter";
import groupConversationsAdapter from "../adapter/groupConversation.adapter";

const {
  selectById: selectDirectConversationById,
  selectAll: selectAllDirectConversations,
  selectIds: selectDirectIds,
} = conversationsAdapter.getSelectors((rootState: RootState) => {
  const state: ConversationState = rootState[SliceName.conversation];
  return state.direct;
});

const {
  selectById: selectGroupConversationById,
  selectAll: selectAllGroupConversations,
  selectIds: selectGroupIds,
} = groupConversationsAdapter.getSelectors((rootState: RootState) => {
  const state: ConversationState = rootState[SliceName.conversation];
  return state.group;
});

export const selectAllConversation = createDraftSafeSelector(
  selectAllDirectConversations,
  selectAllGroupConversations,
  (state: RootState) => state.ui.selectedConversationType,
  (directs, groups, type) => {
    if (type === "direct") return directs;
    return groups;
  }
);

export const selectConversationById = createDraftSafeSelector(
  (state: RootState, id: string) => selectDirectConversationById(state, id),
  (state: RootState, id: string) => selectGroupConversationById(state, id),
  (direct, group) => {
    return direct ?? group;
  }
);

export const selectAvatarConversationById = createDraftSafeSelector(
  [selectConversationById, (state: RootState) => state.profile.profile.user],
  (conversation, userProfile) => {
    const participants = conversation?.participant?.members;
    if (!participants) return;
    if (conversation.type === "group") {
      return participants.map((account) => account.profile?.avatar);
    }
    const index = participants[0].getId() === userProfile.getId() ? 1 : 0;
    return [participants[index].profile?.avatar];
  }
);

export const selectConversationIds = createDraftSafeSelector(
  selectDirectIds,
  selectGroupIds,
  (state: RootState) => state.ui.selectedConversationType,
  (directs, groups, type) => {
    if (type === "direct") return directs;
    return groups;
  }
);
