import answerApi from "@store/repo/call/apis/answerApi";
import type { CallExtraBuilder } from "@store/slices/state/call";
import { toast } from "react-toastify";

export const answerThunk = (builder: CallExtraBuilder) => {
  builder.addCase(answerApi.fulfilled, (state, action) => {
    const payload = action.payload;
    const peer = state.peer;
    if (!peer || !payload || !peer.id) return;
    if (peer.disconnected) peer.reconnect();

    const callModel = state.entities[payload.caller];
    if (!callModel) {
      toast.error("Receiver not found");
      return;
    }
    const connection = callModel.connection;
    connection.answer(payload.stream);
    state.callAnswer = payload.caller;
  });
};
