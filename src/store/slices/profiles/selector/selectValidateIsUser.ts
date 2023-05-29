import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import string from "@utils/string";

type UserObject = User | UserProfile | string | undefined;

const isProfile = (data: any): data is UserProfile => {
  return !!data?.user;
};

const selectValidateIsUser = createSelector(
  [
    (state: RootState, user: UserObject) => ({
      currentUser: state.profile,
      another: user,
    }),
  ],
  ({ currentUser, another }) => {
    if (isProfile(another)) {
      return currentUser.profile.getId() === another.getId();
    }
    return currentUser.user.getId() === string.getId(another);
  }
);

export default selectValidateIsUser;
