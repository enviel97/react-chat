import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchDeleteMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import string from "@utils/string";
import moment from "moment";
import messagesAdapter from "../adapter/message.adapter";

export const fetchDeleteMessageThunk = (builder: MessageExtraBuilder) => {
  builder.addCase(
    fetchDeleteMessages.fulfilled,
    (state, action: PayloadAction<Response<ResponseDeleteMessage>>) => {
      const payload = action.payload;
      const data = payload.data;
      if (data) {
        messagesAdapter.updateOne(state, {
          id: string.getId(data.messageId),
          changes: {
            content: data.content,
            updatedAt: moment().toISOString(),
            modified: State.FULFILLED,
            action: "Removed",
          },
        });
      }
    }
  );
};
