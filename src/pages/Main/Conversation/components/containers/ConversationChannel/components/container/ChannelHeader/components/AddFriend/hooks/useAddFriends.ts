import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchSendFriendRequest, getRelationship } from "@store/repo/user";
import { selectProfile } from "@store/slices/profiles";
import { useCallback, useEffect, useRef, useState } from "react";

const useAddFriend = (members: User[]) => {
  const profile = useAppSelector(selectProfile);
  const [relationship, setRelationship] = useState<Relationship>("guest");
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const friendId = useRef<string>();
  const dispatch = useAppDispatch();

  const onAddFriend = useCallback(() => {
    if (!friendId.current) return;
    const promise = dispatch(fetchSendFriendRequest(friendId.current));
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
  }, [dispatch]);

  useEffect(() => {
    if (members.length > 2) return;
    const id = members.find((id) => !id.isSame(profile.user))?.getId();
    if (!id) return;
    setLoadState("loading");
    const promise = dispatch(getRelationship(id));
    promise
      .unwrap()
      .then((res) => {
        setLoadState("success");
        setRelationship(res.data ?? "guest");
        if (res.data === "guest") {
          friendId.current = id;
        }
      })
      .catch(() => {
        setLoadState("error");
      });

    return () => {
      promise.abort();
    };
  }, [members, dispatch, profile.user]);

  return { loadState, relationship, trigger: onAddFriend };
};

export default useAddFriend;
