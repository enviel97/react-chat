import { PayloadAction } from "@reduxjs/toolkit";
import { fetchAddMessages } from "@store/repo/message";
import { MessageExtraBuilder } from "@store/slices/state/message";
import messagesAdapter from "../adapter/message.adapter";

export const fetchAddMessageThunk = (builder: MessageExtraBuilder) => {
  builder.addCase(
    fetchAddMessages.fulfilled,
    (state, action: PayloadAction<Response<any>>) => {
      const payload = action.payload;
      const message = payload.data;
      console.log({
        ...action,
      });
      messagesAdapter.upsertOne(state, message);
    }
  );
};
