import useAppDispatch from "@hooks/useAppDispatch";
import { fetchMessages } from "@store/repo/message";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetchMessages = (id: string) => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    const promise = dispatch(fetchMessages({ conversationId: id }));
    promise.unwrap().catch((error) => {
      const message = error.message ?? "Bad Request Error";
      if (message !== "Client abort error")
        navigator("/conversation", { replace: true });
    });
    return () => {
      promise.abort("Client abort error");
    };
  }, [id, dispatch, navigator]);
};

export default useFetchMessages;
