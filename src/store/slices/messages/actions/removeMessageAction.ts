import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { MessageState } from "@store/slices/state/message";
import moment from "moment";
import messagesAdapter from "../adapter/message.adapter";

export const removeMessageAction = (
  state: MessageState,
  action: PayloadAction<string>
) => {
  const data = action.payload;
  messagesAdapter.updateOne(state, {
    id: data,
    changes: {
      content: "This chat is removed",
      updatedAt: moment().toLocaleString(),
      modified: State.FULFILLED,
      action: "Removed",
    },
  });
};
