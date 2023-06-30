import { callingApi } from "@store/repo/call";
import type { CallExtraBuilder } from "@store/slices/state/call";
import callsAdapter from "../adapter/call.adapter";

export const callingThunk = (builder: CallExtraBuilder) => {
  builder.addCase(callingApi.fulfilled, (state, action) => {
    const payload = action.payload;
    const peer = state.peer;
    if (!peer || !payload || !peer.id) return;
    if (peer.disconnected) peer.reconnect();
    const caller = peer.call(payload.receiver, payload.stream);

    callsAdapter.upsertOne(state as any, {
      receiver: payload.receiver,
      connection: caller,
      createdAt: new Date().toISOString(),
    });

    state.callAnswer = payload.receiver;
  });
};
