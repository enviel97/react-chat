import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchSendFriendRequest, getRelationship } from "@store/repo/user";
import { selectProfile } from "@store/slices/profiles";
import { useCallback, useEffect, useState } from "react";

const useAddFriend = (friendId?: string) => {
  const profile = useAppSelector(selectProfile);
  const [relationship, setRelationship] = useState<Relationship>("guest");
  const [loadState, setLoadState] = useState<LoadState>("idle");

  const dispatch = useAppDispatch();

  const onAddFriend = useCallback(() => {
    if (relationship !== "guest" || !friendId) return;
    const promise = dispatch(fetchSendFriendRequest(friendId));
    setLoadState("loading");
    PromiseToast({
      action: promise.unwrap,
      abortCallback: promise.abort,
      onSuccess: () => {
        setLoadState("success");
        setRelationship("pending");
      },
      onError: () => setLoadState("error"),
    });
  }, [friendId, relationship, dispatch]);

  useEffect(() => {
    if (!friendId) return;
    setLoadState("loading");
    const promise = dispatch(getRelationship(friendId));
    promise
      .unwrap()
      .then((res) => {
        setLoadState("success");
        setRelationship(res.data ?? "guest");
      })
      .catch(() => {
        setLoadState("error");
      });

    return promise.abort;
  }, [friendId, dispatch, profile.user]);

  return { loadState, relationship, trigger: onAddFriend };
};

export default useAddFriend;
