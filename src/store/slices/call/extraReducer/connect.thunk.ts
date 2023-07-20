import { connect } from "@store/repo/call";
import type { CallExtraBuilder } from "@store/slices/state/call";

const connectThunk = (builder: CallExtraBuilder) => {
  builder.addCase(connect.fulfilled, (state, action) => {
    const peer = action.payload;
    if (!state.peer || state.peer.destroyed) state.peer = peer;
  });
};

export default connectThunk;
