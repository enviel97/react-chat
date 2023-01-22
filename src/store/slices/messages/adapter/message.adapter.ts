import { createEntityAdapter } from "@reduxjs/toolkit";
import string from "@utils/string";

const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => string.getId(message),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default messagesAdapter;
