import { fetchProfile } from "@store/repo/user";
import { ProfileExtraBuilder } from "@store/slices/state/profile";

export const fetchProfileThunk = (builder: ProfileExtraBuilder) => {
  builder.addCase(fetchProfile.fulfilled, (state, action) => {
    state.profile = Object.entries(action.payload).reduce(
      (newObject: Record<string, any>, currentValue) => {
        const [key, value] = currentValue;
        if (value) newObject[key] = value;
        return newObject;
      },
      { ...state.profile }
    ) as UserProfile;
  });
};
