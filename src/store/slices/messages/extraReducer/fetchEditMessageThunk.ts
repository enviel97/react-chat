import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchEditMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import string from "@utils/string";
import moment from "moment";
import messagesAdapter from "../adapter/message.adapter";

export const fetchEditMessageThunk = (builder: MessageExtraBuilder) => {
  builder
    .addCase(
      fetchEditMessages.pending,
      (state, action: PayloadThunkAction<RequestEditMessage>) => {
        messagesAdapter.updateOne(state, {
          id: action.meta.arg.messageId,
          changes: {
            content: action.meta.arg.content,
            updatedAt: moment().toISOString(),
            modified: State.PENDING,
          },
        });
      }
    )
    .addCase(
      fetchEditMessages.rejected,
      (state, action: PayloadThunkAction<RequestEditMessage>) => {
        messagesAdapter.updateOne(state, {
          id: action.meta.arg.messageId,
          changes: {
            content: action.meta.arg.content,
            updatedAt: moment().toISOString(),
            modified: State.ERROR,
          },
        });
      }
    )
    .addCase(
      fetchEditMessages.fulfilled,
      (state, action: PayloadAction<Response<ResponseEditMessage>>) => {
        const payload = action.payload;
        const data = payload.data;
        if (data) {
          messagesAdapter.updateOne(state, {
            id: string.getId(data.messageId),
            changes: {
              content: data.content,
              updatedAt: moment().toISOString(),
              modified: State.FULFILLED,
              action: "Edited",
            },
          });
        }
      }
    );
};
