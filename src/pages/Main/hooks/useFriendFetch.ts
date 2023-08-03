import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { useEffect } from "react";

const useFriendFetch = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(fetchListFriends());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
};

export default useFriendFetch;
