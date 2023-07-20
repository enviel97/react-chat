import { createSelector } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import type { RootState } from "@store/index";
import callsAdapter from "../adapter/call.adapter";

export const {
  selectById: selectCallById,
  selectAll: selectAllCall,
  selectIds: selectCallIds,
} = callsAdapter.getSelectors((state: RootState) => state[SliceName.call]);

export const selectCall = createSelector(
  (state: RootState) => state.call,
  (callState) => callState.callId
);

export const selectIncomingCalls = createSelector(
  selectCallIds,
  (state: RootState) => state.call.callId,
  (incomingCallIds, currentCall) => {
    if (!currentCall) return incomingCallIds;
    return incomingCallIds.filter((id) => id !== currentCall);
  }
);

export const selectLocalInfo = createSelector(
  (state: RootState) => state.profile.user,
  (user) => {
    return {
      name: user?.firstName ?? user?.profile?.displayName ?? "Your",
      avatar: user?.profile?.avatar,
    };
  }
);

export const selectRemoteInfo = createSelector(
  (state: RootState) => state.call,
  (callState) => {
    const callId = callState.callId;
    const currentCall = callId && callState.entities[callId];
    if (!currentCall) return { name: "@Unknown" };

    return {
      name: currentCall.name,
      avatar: currentCall.avatar,
    };
  }
);

export const selectCurrentCall = createSelector(
  (state: RootState) => state.call,
  (callState) => {
    const callId = callState.callId;
    const incomingCall = callId && callState.entities[callId];
    if (!incomingCall) return;
    return incomingCall;
  }
);
