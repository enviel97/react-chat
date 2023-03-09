import { createEntityAdapter } from "@reduxjs/toolkit";
import string from "@utils/string";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: (conversation) => string.getId(conversation),
  sortComparer: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
});

export default conversationsAdapter;
