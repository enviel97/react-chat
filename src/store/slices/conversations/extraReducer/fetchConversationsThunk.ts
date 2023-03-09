import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchConversations } from "@store/repo/conversation";
import { ConversationExtraBuilder } from "@store/slices/state/conversation";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const fetchConversationsThunk = (builder: ConversationExtraBuilder) => {
  builder
    .addCase(fetchConversations.pending, (state, action) => {
      state.process = State.PENDING;
    })
    .addCase(fetchConversations.rejected, (state, action) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchConversations.fulfilled,
      (state, action: PayloadAction<Response<Conversation[]>>) => {
        const payload = action.payload;
        const conversations = payload.data;
        if (!conversations) return;
        const { adapter, state: eState } = getAdapterConversation(
          state,
          state.type
        );

        adapter.upsertMany(eState, conversations);
        state.process = State.FULFILLED;
      }
    );
};
