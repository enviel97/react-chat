import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import callsAdapter from "./adapter/call.adapter";
import type { CallState } from "../state/call";
import addIncomingCallAction from "./actions/addIncomingCall.action";
import removeIncomingCallAction from "./actions/removeIncomingCall.action";
import connectThunk from "./extraReducer/connect.thunk";
import { setCallAction, setConnectionAction } from "./actions/set.action";

export const callSlice = createSlice({
  name: SliceName.call,
  initialState: callsAdapter.getInitialState({
    // In process call
    localStream: null,
    callId: null,
    mediaConnection: null,
  }) as CallState,
  reducers: {
    // call
    addIncomingCall: addIncomingCallAction,
    removeIncomingCall: removeIncomingCallAction,
    setCall: setCallAction,
    setConnection: setConnectionAction,
  },
  extraReducers: (builder) => {
    connectThunk(builder);
  },
});

export const { addIncomingCall, removeIncomingCall, setConnection, setCall } =
  callSlice.actions;

export * as peerSelector from "./selectors/peer.selector";
export * as callSelector from "./selectors/call.selector";

export default callSlice.reducer;
