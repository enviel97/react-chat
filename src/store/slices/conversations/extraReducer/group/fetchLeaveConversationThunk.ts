import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchLeaveConversation } from "@store/repo/conversation";
import { ConversationExtraBuilder } from "@store/slices/state/conversation";
import string from "@utils/string";
import { getAdapterConversation } from "../../utils/getAdapterConversation.";

const fetchLeaveConversationThunk = (builder: ConversationExtraBuilder) => {
  builder.addCase(
    fetchLeaveConversation.fulfilled,
    (state, action: PayloadAction<Response<Conversation>>) => {
      const payload = action.payload;
      const conversations = payload.data;
      if (!conversations) return;
      const { adapter, state: eState } = getAdapterConversation(state, "group");
      adapter.removeOne(eState, string.getId(conversations));
      state.process = State.FULFILLED;
    }
  );
};

export default fetchLeaveConversationThunk;
