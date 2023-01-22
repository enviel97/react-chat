import { PayloadAction } from "@reduxjs/toolkit";
import { fetchDeleteMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import string from "@utils/string";
import messagesAdapter from "../adapter/message.adapter";

export const fetchDeleteMessageThunk = (builder: MessageExtraBuilder) => {
  builder.addCase(
    fetchDeleteMessages.fulfilled,
    (state, action: PayloadAction<Response<ResponseDeleteMessage>>) => {
      const payload = action.payload;
      const data = payload.data;
      messagesAdapter.removeOne(state, string.getId(data?.messageId));
    }
  );
};
