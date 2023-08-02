import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import callsAdapter from "./adapter/call.adapter";
import type { CallState } from "../state/call";
import addIncomingCallAction from "./actions/addIncomingCall.action";
import removeIncomingCallAction from "./actions/removeIncomingCall.action";
import {
  setCallAction,
  setCallErrorAction,
  setMediaConnectionAction,
} from "./actions/set.action";
import { callControllerThunk } from "./extraReducer/callController.thunk";
import initPeerThunk from "./extraReducer/initPeer.thunk";

export const callSlice = createSlice({
  name: SliceName.call,
  initialState: callsAdapter.getInitialState() as CallState,
  reducers: {
    // call
    addIncomingCall: addIncomingCallAction,
    removeIncomingCall: removeIncomingCallAction,

    // set call
    setCall: setCallAction,
    setMediaConnection: setMediaConnectionAction,
    setCallError: setCallErrorAction,
  },
  extraReducers: (builder) => {
    initPeerThunk(builder);
    callControllerThunk(builder);
  },
});

export const {
  addIncomingCall,
  removeIncomingCall,

  setCall,
  setMediaConnection,
  setCallError,
} = callSlice.actions;

export * as peerSelector from "./selectors/peer.selector";
export * as callSelector from "./selectors/call.selector";

export default callSlice.reducer;
