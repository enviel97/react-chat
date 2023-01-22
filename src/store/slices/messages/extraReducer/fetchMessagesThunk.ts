import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import messagesAdapter from "../adapter/message.adapter";

export const fetchMessageThunk = (builder: MessageExtraBuilder) => {
  builder
    .addCase(fetchMessages.pending, (state, _) => {
      state.process = State.PENDING;
    })
    .addCase(fetchMessages.rejected, (state, _) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchMessages.fulfilled,
      (state, action: PayloadAction<Response<Pagination<Message>>>) => {
        const payload = action.payload;
        const pagination = payload.data;
        if (Number(pagination?.bucket ?? -1) === 0) {
          messagesAdapter.removeAll(state);
        }
        if (!pagination?.data) return;
        messagesAdapter.upsertMany(state, pagination.data);
        //
        state.process = State.FULFILLED;
      }
    );
};
