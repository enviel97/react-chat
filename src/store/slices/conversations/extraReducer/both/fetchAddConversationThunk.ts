import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchAddConversation } from "@store/repo/conversation";
import {
  ConversationExtraBuilder,
  ResponseThunkConversation,
} from "@store/slices/state/conversation";
import { getAdapterConversation } from "../../utils/getAdapterConversation.";

const fetchAddConversationThunk = (builder: ConversationExtraBuilder) => {
  builder
    .addCase(fetchAddConversation.pending, (state, action) => {
      state.process = State.PENDING;
    })
    .addCase(fetchAddConversation.rejected, (state, action) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchAddConversation.fulfilled,
      (state, action: PayloadAction<ResponseThunkConversation>) => {
        const payload = action.payload;
        const conversation = payload.conversation.data;
        if (!conversation) return;
        if (conversation.type === payload.type) {
          const { adapter, state: eState } = getAdapterConversation(
            state,
            conversation.type
          );

          adapter.upsertOne(eState, conversation);
        }

        //
        state.process = State.FULFILLED;
      }
    );
};

export default fetchAddConversationThunk;
