import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchConversations } from "@store/repo/conversation";
import { selectConversationType } from "@store/slices/ui";
import { useEffect } from "react";

const useConversationFetch = () => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectConversationType);
  useEffect(() => {
    const promise = dispatch(fetchConversations(type));
    return promise.abort;
  }, [dispatch, type]);
};

export default useConversationFetch;
