import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchListFriends } from "@store/repo/user";
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
});

const UserProvider: FC<Components> = ({ children }) => {
  const [state, dispatch] = useReducer(userProviderReducer, INIT_STATE);
  const reduxDispatch = useAppDispatch();
  const socket = useSocket();

  const updateSwap = useCallback((payload: SwapStatusPayload) => {
    dispatch({ type: Action.UPDATE_SWAP, payload });
  }, []);

  const selectOnlineIds = useCallback(
    () => [...state.onlineIds],
    [state.onlineIds]
  );
  const selectOfflineIds = useCallback(
    () => [...state.offlineIds],
    [state.offlineIds]
  );

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_LIST_STATUS_RESPONSE,
      ({ online, offline }) => {
        dispatch({ type: Action.UPDATE_ONLINE, payload: online });
        dispatch({ type: Action.UPDATE_OFFLINE, payload: offline });
      }
    );
    return () => {
      socket.off(Event.EVENT_FRIEND_LIST_STATUS_RESPONSE);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    const promise = reduxDispatch(fetchListFriends());
    promise.unwrap().then((response) => {
      const friendList = response.data;
      if (!friendList) return;
      dispatch({ type: Action.SET_FRIENDS, payload: friendList });
      socket.emit(
        Event.EVENT_FRIEND_LIST_STATUS,
        friendList.map((profile) => ({
          id: profile.getId(),
          userId: profile.user.getId(),
        }))
      );
    });
    return promise.abort;
  }, [socket, dispatch, reduxDispatch]);

  return (
    <UserContext.Provider
      value={{
        updateSwap,
        selectOfflineIds,
        selectOnlineIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
