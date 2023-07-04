import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import { selectUsers } from "./selectAdapter";

export const selectOnline = createSelector(
  selectUsers,
  (state: RootState) => state.user.onlineIds,
  (profiles, onlineStatus) => {
    return profiles.reduce((userIds, profile) => {
      if (onlineStatus.includes(profile.user.getId())) {
        userIds.push(profile.getId());
      }
      return userIds;
    }, new Array<string>());
  }
);

export const selectOffline = createSelector(
  (state: RootState) => state.user.onlineIds,
  (state: RootState) => state.user.ids,
  selectUsers,
  (onlineStatus, ids, profiles) => {
    if (onlineStatus.length === 0) return ids;
    return profiles.reduce((userIds, profile) => {
      if (!onlineStatus.includes(profile.user.getId())) {
        userIds.push(profile.getId());
      }
      return userIds;
    }, new Array<string>());
  }
);
