import { State } from "@store/common/state";
import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";

export interface UserState extends EntityState<User> {
  process: State;
}

export type UserExtraBuilder = ActionReducerMapBuilder<UserState>;
