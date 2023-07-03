import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { CallState } from "@store/slices/state/call";
import callsAdapter from "../../adapter/call.adapter";

type DeleteCallActionReducer = CaseReducer<CallState, PayloadAction<string>>;

const deleteCallAction: DeleteCallActionReducer = (state, action) => {
  const receiver = action.payload;
  callsAdapter.removeOne(state as any, receiver);
};

export default deleteCallAction;
