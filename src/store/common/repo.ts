export const SIGN_IN_URL = "/auth/login";
export const SIGN_UP_URL = "/auth/register";
export const AUTH_STATUS_URL = "/auth/status";

export const CONVERSATION_GET_LIST = "/conversations";
export const CONVERSATION_CREATE_SINGLE = "/conversations";
export const CONVERSATION_ADD_MEMBERS = "/conversations/:id/participants";
export const CONVERSATION_REMOVE_MEMBERS =
  "/conversations/:id/participants/:userId";
export const CONVERSATION_LEAVE = "/conversations/:id/participants/leave";

export const MESSAGE_POST = "/conversations/:conversationId/messages";
export const MESSAGE_GET_LIST = "/conversations/:conversationId/messages";
export const MESSAGE_UPDATE =
  "/conversations/:conversationId/messages/:messageId";
export const MESSAGE_DELETE =
  "/conversations/:conversationId/messages/:messageId";

export const USER_GET_SEARCH = "/users/search";
export const USER_GET_FRIENDS = "/users/profile/friends";
