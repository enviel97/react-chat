import { State } from "@store/common/state";
import { fetchAddMessages } from "@store/repo/message";
import messageUtils from "@store/repo/message/utils/utils";
import { MessageExtraBuilder } from "@store/slices/state/message";
import messagesAdapter from "../adapter/message.adapter";

export const fetchAddMessageThunk = (builder: MessageExtraBuilder) => {
  builder
    .addCase(
      fetchAddMessages.pending,
      (state, action: PayloadThunkAction<RequestSendMessage>) => {
        const pendingMessage: any = messageUtils.createTemp(action.meta.arg);
        messagesAdapter.addOne(state, {
          ...pendingMessage,
          modified: State.PENDING,
        });
      }
    )
    .addCase(
      fetchAddMessages.rejected,
      (state, action: PayloadThunkAction<RequestSendMessage>) => {
        messagesAdapter.updateOne(state, {
          id: action.meta.arg.tempId,
          changes: {
            modified: State.ERROR,
          },
        });
      }
    )
    .addCase(
      fetchAddMessages.fulfilled,
      (
        state,
        action: PayloadThunkAction<RequestSendMessage, Response<Message>>
      ) => {
        const payload = action.payload;
        const message = payload.data;
        if (message) {
          messagesAdapter.updateOne(state, {
            id: action.meta.arg.tempId,
            changes: { ...message, modified: State.FULFILLED },
          });
        }
      }
    );
};
