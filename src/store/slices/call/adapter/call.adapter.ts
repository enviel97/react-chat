import { createEntityAdapter } from "@reduxjs/toolkit";

const callsAdapter = createEntityAdapter<CallModel>({
  selectId: (entity) => entity.connectionId,
});

export default callsAdapter;
