import { createEntityAdapter } from "@reduxjs/toolkit";
import string from "@utils/string";

const groupConversationsAdapter = createEntityAdapter<Conversation>({
  selectId: (conversation) => string.getId(conversation),
  sortComparer: (a, b) =>
    new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
});

export default groupConversationsAdapter;
