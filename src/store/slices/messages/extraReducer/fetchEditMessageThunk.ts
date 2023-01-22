import { PayloadAction } from "@reduxjs/toolkit";
import { fetchEditMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import string from "@utils/string";
import moment from "moment";
import messagesAdapter from "../adapter/message.adapter";

export const fetchEditMessageThunk = (builder: MessageExtraBuilder) => {
  builder.addCase(
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
          },
        });
      }
    }
  );
};
