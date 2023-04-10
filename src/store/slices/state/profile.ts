import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export interface ProfileState {
  user: User;
  profile: UserProfile;
}

export type ProfileExtraBuilder = ActionReducerMapBuilder<ProfileState>;
