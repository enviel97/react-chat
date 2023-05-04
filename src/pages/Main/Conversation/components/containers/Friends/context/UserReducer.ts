import string from "@utils/string";

export const userProviderReducer = (
  state: UserProviderState,
  action: UseProviderAction
) => {
  const updateSet = (currentSet: Set<string>, payload: string[]) => {
    if (payload.length === 1) {
      currentSet.add(payload[0]);
    }
    return new Set([...currentSet, ...payload]);
  };
  switch (action.type) {
    case "update.offline": {
      return {
        ...state,
        offlineIds: updateSet(state.offlineIds, action.payload),
      };
    }

    case "update.online": {
      return {
        ...state,
        onlineIds: updateSet(state.onlineIds, action.payload),
      };
    }

    case "update.swap": {
      if (action.payload.status === "online") {
        state.offlineIds.delete(action.payload.id);
        state.onlineIds.add(action.payload.id);
      } else {
        state.offlineIds.add(action.payload.id);
        state.onlineIds.delete(action.payload.id);
      }
      return {
        ...state,
        onlineIds: state.onlineIds,
        offlineIds: state.offlineIds,
      };
    }

    case "update.friends": {
      action.payload.forEach((friend) =>
        state.friends.set(friend.getId(), friend)
      );

      return { ...state, friends: state.friends };
    }

    case "update.friendInfo": {
      const payload = action.payload;
      if (state.friends.has(payload.id)) {
        state.friends.set(string.getId(payload.id), {
          ...state.friends.get(payload.id)!,
          ...payload.change,
        });
      }
      return state;
    }
    default:
      return state;
  }
};
