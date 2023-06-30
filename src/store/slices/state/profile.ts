import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export interface ProfileState {
  user?: User;
  profile: UserProfile;
  process: LoadState;
}

export type ProfileExtraBuilder = ActionReducerMapBuilder<ProfileState>;
