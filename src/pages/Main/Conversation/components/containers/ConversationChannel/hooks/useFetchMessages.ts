import useAppDispatch from "@hooks/useAppDispatch";
import { fetchMessages } from "@store/repo/message";
import { useEffect } from "react";

const useFetchMessages = (id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchMessages({ conversationId: id }));
    return promise.abort;
  }, [id, dispatch]);
};

export default useFetchMessages;
