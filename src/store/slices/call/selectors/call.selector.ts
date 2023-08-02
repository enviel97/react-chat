import { createDraftSafeSelector } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import type { RootState } from "@store/index";
import callsAdapter from "../adapter/call.adapter";

export const {
  selectById: selectCallById,
  selectAll: selectAllCall,
  selectIds: selectCallIds,
} = callsAdapter.getSelectors((state: RootState) => state[SliceName.call]);

export const selectCall = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => callState.callId
);

export const selectIncomingCalls = createDraftSafeSelector(
  selectCallIds,
  (state: RootState) => state.call.callId,
  (incomingCallIds, currentCall) => {
    if (!currentCall) return incomingCallIds;
    return incomingCallIds.filter((id) => id !== currentCall);
  }
);

export const selectLocalInfo = createDraftSafeSelector(
  (state: RootState) => state.profile.user,
  (user) => {
    return {
      name: user?.firstName ?? user?.profile?.displayName ?? "Your",
      avatar: user?.profile?.avatar,
    };
  }
);

export const selectRemoteInfo = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => {
    const callId = callState.callId;
    const currentCall = callId && callState.entities[callId];
    if (!currentCall) return;

    return {
      name: currentCall.name,
      avatar: currentCall.avatar,
    };
  }
);

export const selectCurrentCall = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => {
    const callId = callState.callId;
    const incomingCall = callId && callState.entities[callId];
    if (!incomingCall) return;
    return incomingCall;
  }
);

export const selectCallError = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => callState.errorMess
);
