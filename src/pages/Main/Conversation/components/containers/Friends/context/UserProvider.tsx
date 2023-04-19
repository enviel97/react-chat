import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { createContext, FC, useCallback, useEffect, useReducer } from "react";
import { userProviderReducer } from "./UserReducer";

enum Action {
  SET_FRIENDS = "update.friends",
  UPDATE_ONLINE = "update.online",
  UPDATE_OFFLINE = "update.offline",
  UPDATE_SWAP = "update.swap",
}

const INIT_STATE = {
  onlineIds: new Set([]),
  offlineIds: new Set([]),
  friends: new Map<string, UserProfile>(),
};

interface Context {
  updateSwap: (payload: SwapStatusPayload) => void;
  // Selector
  selectById: (friendId: string) => UserProfile | undefined;
  selectOnlineIds: () => string[];
  selectOfflineIds: () => string[];
}

export const UserContext = createContext<Context>({
  updateSwap: (payload: SwapStatusPayload) => {
    throw new Error("Not Implement");
  },
  selectOnlineIds: () => {
    throw new Error("Not Implement");
  },
  selectOfflineIds: () => {
    throw new Error("Not Implement");
  },
  selectById: (friendId: string) => {
    throw new Error("Not Implement");
  },
});

const UserProvider: FC<Components> = ({ children }) => {
  const [state, dispatch] = useReducer(userProviderReducer, INIT_STATE);
  const socket = useSocket();

  const updateSwap = useCallback((payload: SwapStatusPayload) => {
    dispatch({ type: Action.UPDATE_SWAP, payload });
  }, []);

  const selectById = useCallback(
    (payload: string) => {
      return state.friends.get(payload)!;
    },
    [state]
  );

  const selectOnlineIds = useCallback(() => [...state.onlineIds], [state]);
  const selectOfflineIds = useCallback(() => [...state.offlineIds], [state]);

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_LIST_STATUS_RESPONSE,
      ({ online, offline, listFriend }) => {
        dispatch({ type: Action.UPDATE_ONLINE, payload: online });
        dispatch({ type: Action.UPDATE_OFFLINE, payload: offline });
        dispatch({ type: Action.SET_FRIENDS, payload: listFriend });
      }
    );
    return () => {
      socket.off(Event.EVENT_FRIEND_LIST_STATUS_RESPONSE);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    socket.emit(Event.EVENT_FRIEND_LIST_STATUS);
  }, [socket, dispatch]);

  return (
    <UserContext.Provider
      value={{
        updateSwap,
        selectById,
        selectOfflineIds,
        selectOnlineIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
