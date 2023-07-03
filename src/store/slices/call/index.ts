import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { CallState } from "../state/call";
import callsAdapter from "./adapter/call.adapter";
import {
  deleteCallAction,
  addCallAction,
  callAction,
  stopAction,
} from "./actions";
import initialWebRTC from "./actions/handles/initialWebRTC.action";
import authenticateThunk from "./extraReducer/authenticate.thunk";

export const callSlice = createSlice({
  name: SliceName.call,
  initialState: callsAdapter.getInitialState() as CallState,
  reducers: {
    // call
    addConnectionModel: addCallAction,
    deleteConnectionModel: deleteCallAction,

    //
    openCallView: callAction,
    closeCallView: stopAction,
    initial: initialWebRTC,
  },
  extraReducers: (builder) => {
    authenticateThunk(builder);
  },
});

export const {
  addConnectionModel,
  deleteConnectionModel,

  openCallView,
  closeCallView,
  initial,
} = callSlice.actions;

export const {
  selectById: selectCallById,
  selectAll: selectAllCall,
  selectIds: selectCallIds,
} = callsAdapter.getSelectors((state: any) => state[SliceName.call]);

export { default as selectCurrentCall } from "./selectors/selectCurrentAnswer";
export { default as selectPeer } from "./selectors/selectPeer";

export default callSlice.reducer;
