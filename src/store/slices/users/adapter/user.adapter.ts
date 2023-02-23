import { createEntityAdapter } from "@reduxjs/toolkit";

import string from "@utils/string";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => string.getId(user),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default usersAdapter;
