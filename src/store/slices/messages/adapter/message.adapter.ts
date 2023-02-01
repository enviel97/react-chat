import { createEntityAdapter } from "@reduxjs/toolkit";
import { MessageInState } from "@store/slices/state/message";
import string from "@utils/string";

const messagesAdapter = createEntityAdapter<MessageInState>({
  selectId: (message) => string.getId(message),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default messagesAdapter;
