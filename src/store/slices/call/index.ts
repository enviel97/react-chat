import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { CallState } from "../state/call";

import callsAdapter from "./adapter/call.adapter";
import addCallAction from "./actions/addCall.action";
import deleteCallAction from "./actions/deleteCall.action";

import { callingThunk } from "./extraReducer/calling.thunk";
import { answerThunk } from "./extraReducer/answer.thunk";

export const callSlice = createSlice({
  name: SliceName.call,
  initialState: callsAdapter.getInitialState() as CallState,
  reducers: {
    addCall: addCallAction,
    deleteCall: deleteCallAction,
  },
  extraReducers: (builder) => {
    callingThunk(builder);
    answerThunk(builder);
  },
});

export const { addCall, deleteCall } = callSlice.actions;

export const {
  selectById: selectCallById,
  selectAll: selectAllCall,
  selectIds: selectCallIds,
} = callsAdapter.getSelectors((state: any) => state[SliceName.call]);
export { default as selectCurrentCall } from "./selectors/selectCurrentAnswer";
export { default as selectPeer } from "./selectors/selectPeer";

export default callSlice.reducer;
