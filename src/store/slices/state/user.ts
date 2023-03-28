import { State } from "@store/common/state";
import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";

export interface UserProfileState extends EntityState<UserProfile> {
  process: State;
}

export type UserProfileExtraBuilder = ActionReducerMapBuilder<UserProfileState>;
