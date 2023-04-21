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
export const USER_GET_SEARCH_FRIENDS = "/users/profile/search";
export const USER_POST_SEND_FRIEND_REQUEST = "/users/friend/request";
export const USER_GET_FRIEND_REQUESTS = "/users/friend/request";
export const USER_PATCH_FRIEND_PENDING = "/users/friend/pending";
export const USER_PATCH_FRIEND_REQUESTS_RESPONSE =
  "/users/friend/response/:friendRequestId";
export const USER_DELETE_FRIEND_REQUEST_CANCEL = "/users/friend/cancel/:id";

export const PROFILE_DETAIL = "/users/profile";
export const PROFILE_UPLOAD_IMAGE = `${PROFILE_DETAIL}/update/:type`;
