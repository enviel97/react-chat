export const Event = Object.freeze({
  EVENT_USER_TYPING_START: "onUserTypingStart",
  EVENT_USER_TYPING_STOP: "onUserTypingStop",
  EVENT_USER_TYPED: "onUserTyping",

  EVENT_CONNECT_ROOM_CONVERSATION: "onConnectRoomConversation",
  EVENT_CONVERSATION_CREATED: "onConversationCreated",
  EVENT_LEAVE_ROOM_CONVERSATION: "onLeaveRoomConversation",
  EVENT_CONNECTED_ROOM: "onConnectedRoom",
  EVENT_LEAVED_ROOM: "onLeavedRoom",
  EVENT_REMOVE_NEW_MEMBERS: "onRemoveMember",
  EVENT_BANNED_USER: "onBannedUser",

  EVENT_MESSAGE_CREATED: "onMessageCreated",
  EVENT_MESSAGE_REMOVE: "onMessageRemove",
  EVENT_MESSAGE_EDITED: "onMessageEdited",

  EVENT_SOCKET_CONNECTED: "connected",
  EVENT_SOCKET_ERROR: "connect_error",
});
