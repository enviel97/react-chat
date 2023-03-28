import { createEntityAdapter } from "@reduxjs/toolkit";

import string from "@utils/string";

const userProfilesAdapter = createEntityAdapter<UserProfile>({
  selectId: (user) => string.getId(user),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default userProfilesAdapter;
