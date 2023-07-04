import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import {
  selectTotalFriendRequest,
  updateTotalFriendRequest,
} from "@store/slices/ui";
import { useEffect } from "react";

const useQuantityNotification = () => {
  const socket = useSocket();
  const quantity = useAppSelector(selectTotalFriendRequest);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const _id = setInterval(() => {
      socket.emit(
        Event.EVENT_FRIEND_REQUEST_QUANTITY,
        { quantity: quantity ?? 0 },
        (payload: number | null) => {
          if (payload === null) return;
          dispatch(updateTotalFriendRequest(payload));
        }
      );
      // 5s emit once
    }, 5000);
    return () => {
      clearInterval(_id);
    };
  }, [socket, quantity, dispatch]);
};

export default useQuantityNotification;
