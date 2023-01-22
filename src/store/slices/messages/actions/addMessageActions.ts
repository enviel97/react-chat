import { PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "@store/slices/state/message";
import messagesAdapter from "../adapter/message.adapter";

export const addMessageAction = (
  state: MessageState,
  action: PayloadAction<Message>
) => messagesAdapter.upsertOne(state, action);
