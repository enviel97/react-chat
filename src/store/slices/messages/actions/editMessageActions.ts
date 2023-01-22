import { PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "@store/slices/state/message";
import moment from "moment";
import messagesAdapter from "../adapter/message.adapter";

export const editMessageAction = (
  state: MessageState,
  action: PayloadAction<ActionEditParams>
) => {
  const data = action.payload;
  messagesAdapter.updateOne(state, {
    id: data.messageId,
    changes: {
      content: data.content,
      updatedAt: moment().toLocaleString(),
    },
  });
};
