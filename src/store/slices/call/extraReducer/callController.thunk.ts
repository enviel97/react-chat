import { beginCall, endedCall } from "@store/repo/call/actions/callController";
import type { CallExtraBuilder } from "@store/slices/state/call";
import callsAdapter from "../adapter/call.adapter";
import { CallErrorMapping } from "../common/error";

export const callControllerThunk = (builder: CallExtraBuilder) => {
  /**
   * Begin call
   */

  builder
    .addCase(beginCall.rejected, (state, action) => {
      const rejectId = (action.payload as CallErrorType) ?? "unknown";
      state.errorMess = CallErrorMapping[rejectId];
    })
    .addCase(beginCall.fulfilled, (state, action) => {
      const payload = action.payload;
      state.localStream = payload.localStream;
      state.peer = payload.peer;
    });

  /**
   * Ended call
   */
  builder
    .addCase(endedCall.rejected, (state, action) => {
      const rejectId = (action.payload as CallErrorType) ?? "unknown";
      state.errorMess = CallErrorMapping[rejectId];
    })
    .addCase(endedCall.fulfilled, (state, action) => {
      const payload = action.payload;
      callsAdapter.removeOne(state, payload.callId);
      if (state.callId === payload.callId) {
        // User has a call now
        state.localStream = undefined;
        state.mediaConnection = undefined;
        state.callId = undefined;
      }
    });
};
