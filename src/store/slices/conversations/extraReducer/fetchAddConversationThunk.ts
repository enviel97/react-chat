import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchAddConversation } from "@store/repo/conversation";
import { ConversationExtraBuilder } from "@store/slices/state/conversation";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const fetchAddConversationThunk = (
  builder: ConversationExtraBuilder
) => {
  builder
    .addCase(fetchAddConversation.pending, (state, action) => {
      state.process = State.PENDING;
    })
    .addCase(fetchAddConversation.rejected, (state, action) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchAddConversation.fulfilled,
      (state, action: PayloadAction<Response<Conversation>>) => {
        const payload = action.payload;
        const conversation = payload.data;
        if (!conversation) return;
        const { adapter, state: eState } = getAdapterConversation(state);
        adapter.upsertOne(eState, conversation);

        //
        state.process = State.FULFILLED;
      }
    );
};
