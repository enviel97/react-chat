import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { updateConversation } from "@store/slices/conversations";
import { selectConversationType } from "@store/slices/ui";
import { useCallback } from "react";

const useListenLeavingUser = (id: string) => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectConversationType);

  const handleLeavingGroup = useCallback(
    (payload: Conversation) => {
      if (id !== payload.getId()) return;
      dispatch(updateConversation({ conversation: payload, type }));
    },
    [dispatch, type, id]
  );

  return handleLeavingGroup;
};

export default useListenLeavingUser;
