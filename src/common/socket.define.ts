export const Event = Object.freeze({
  EVENT_USER_TYPING_START: "onUserTypingStart",
  EVENT_USER_TYPING_STOP: "onUserTypingStop",
  EVENT_USER_TYPED: "onUserTyping",

  EVENT_CONNECT_ROOM_CONVERSATION: "onConnectRoomConversation",
  EVENT_LEAVE_ROOM_CONVERSATION: "onLeaveRoomConversation",
  EVENT_CONVERSATION_CREATED: "onConversationCreated",
  EVENT_CONNECTED_ROOM: "onConnectedRoom",
  EVENT_LEAVED_ROOM: "onLeavedRoom",
  EVENT_CONVERSATION_LEAVE_GROUP: "onConversationLeaving",
  EVENT_REMOVE_NEW_MEMBERS: "onRemoveMember",
  EVENT_BANNED_USER: "onBannedUser",
  EVENT_NOTIFICATION_CHANGE_STATUS: "onNotificationChangeStatus",
  EVENT_MESSAGE_UPDATE_LAST_MESSAGE: "onUpdateLastMessage",

  EVENT_MESSAGE_CREATED: "onMessageCreated",
  EVENT_MESSAGE_REMOVE: "onMessageRemove",
  EVENT_MESSAGE_EDITED: "onMessageEdited",

  EVENT_PARTICIPANT_GET_STATUS: "participant.getStatus",
  EVENT_PARTICIPANT_STATUS_RESPONSE: "onParticipantStatusResponse",

  EVENT_FRIEND_RECEIVE_FRIEND_REQUEST: "onReceiveFriendRequest",
  EVENT_FRIEND_RECEIVE_ALLOW_FRIEND: "onReceiveAllowFriendRequest",
  EVENT_FRIEND_RECEIVE_REJECT_FRIEND: "onReceiveRejectFriendRequest",
  EVENT_FRIEND_RECEIVE_CANCEL_FRIEND_REQUEST: "onReceiveCancelFriendRequest",

  EVENT_SOCKET_CONNECTED: "connected",
  EVENT_SOCKET_ERROR: "connect_error",
  EVENT_SOCKET_DISCONNECT: "disconnect",
  EVENT_SOCKET_DDOS: "ddos_warning",
  EVENT_SOCKET_RECONNECT: "reconnect",
  EVENT_FRIEND_LIST_STATUS: "onFriendListStatus",
  EVENT_FRIEND_LIST_STATUS_RESPONSE: "onFriendListStatusResponse",
  EVENT_FRIEND_LIST_RETRIEVE: "onFriendListRetrieve",

  IMAGE_UPLOAD_AVATAR_ERROR: "image_profile_upload_error",
  IMAGE_UPLOAD_AVATAR_SUCCESS: "image_profile_upload_success",

  EVENT_FRIEND_UPLOAD_IMAGE: "onFriendUploadImage",
  EVENT_FRIEND_UPDATE_PROFILE: "onFriendUploadProfile",
  EVENT_FRIEND_REQUEST_QUANTITY: "get.quantity",
});
