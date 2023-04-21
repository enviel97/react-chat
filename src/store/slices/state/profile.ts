import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export interface ProfileState {
  user: User;
  profile: UserProfile;
  percentageAvatar: number;
  percentageBanner: number;
}

export type ProfileExtraBuilder = ActionReducerMapBuilder<ProfileState>;
