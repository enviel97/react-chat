import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchAddMembers } from "@store/repo/conversation";
import { ConversationExtraBuilder } from "@store/slices/state/conversation";
import string from "@utils/string";
import { getAdapterConversation } from "../../utils/getAdapterConversation.";

const fetchAddMembersToConversationsThunk = (
  builder: ConversationExtraBuilder
) => {
  builder.addCase(
    fetchAddMembers.fulfilled,
    (state, action: PayloadAction<Response<Conversation>>) => {
      const payload = action.payload;
      const conversations = payload.data;
      if (!conversations) return;
      const { adapter, state: eState } = getAdapterConversation(state, "group");

      adapter.updateOne(eState, {
        id: string.getId(conversations),
        changes: {
          participant: conversations.participant,
        },
      });
      state.process = State.FULFILLED;
    }
  );
};

export default fetchAddMembersToConversationsThunk;
