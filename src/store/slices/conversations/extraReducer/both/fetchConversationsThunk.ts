import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchConversations } from "@store/repo/conversation";
import {
  ConversationExtraBuilder,
  ResponseThunkConversations,
} from "@store/slices/state/conversation";
import { getAdapterConversation } from "../../utils/getAdapterConversation.";

const fetchConversationsThunk = (builder: ConversationExtraBuilder) => {
  builder
    .addCase(fetchConversations.pending, (state, action) => {
      state.process = State.PENDING;
    })
    .addCase(fetchConversations.rejected, (state, action) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchConversations.fulfilled,
      (state, action: PayloadAction<ResponseThunkConversations>) => {
        const payload = action.payload;
        const conversations = payload.conversations.data;

        if (!conversations) return;
        const { adapter, state: eState } = getAdapterConversation(
          state,
          payload.type
        );

        adapter.upsertMany(eState, conversations);
        state.process = State.FULFILLED;
      }
    );
};

export default fetchConversationsThunk;
