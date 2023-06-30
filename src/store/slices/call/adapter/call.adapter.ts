import { createEntityAdapter } from "@reduxjs/toolkit";
import type { CallModel } from "@store/slices/state/call";

const callsAdapter = createEntityAdapter<CallModel>({
  selectId: (call) => call.receiver,
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default callsAdapter;