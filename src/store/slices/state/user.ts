import { State } from "@store/common/state";
import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";

export interface UserProfileState extends EntityState<UserProfile> {
  onlineIds: string[];
  process: State;
}

export type UserProfileExtraBuilder = ActionReducerMapBuilder<UserProfileState>;
