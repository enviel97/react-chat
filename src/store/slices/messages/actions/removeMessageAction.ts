import { PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "@store/slices/state/message";
import messagesAdapter from "../adapter/message.adapter";

export const removeMessageAction = (
  state: MessageState,
  action: PayloadAction<string>
) => {
  return messagesAdapter.removeOne(state, action.payload);
};
