import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserMinus,
} from "react-icons/hi2";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchAddConversation } from "@store/repo/conversation";
import { useNavigate } from "react-router-dom";

const useListFriendAction = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const handleMessageToFriend = useCallback(
    async (data: UserProfile) => {
      const { conversation: response } = await dispatch(
        fetchAddConversation({
          idParticipant: [data.user.getId()],
        })
      ).unwrap();
      if (!response.data) return;
      navigator(`/conversation/messenger/${response.data.getId()}`);
    },
    [dispatch, navigator]
  );

  const actions = useMemo<ContextMenuOption[]>(() => {
    return [
      {
        icon: <HiOutlineChatBubbleLeftRight size={"1em"} />,
        label: "Message",
        onClick: handleMessageToFriend,
        hoverColor: theme.primaryColor,
      },
      {
        icon: <HiOutlineUserMinus size={"1em"} />,
        label: "Unfriend",
        onClick: (value?: UserProfile) => {},
        hoverColor: theme.errorColor,
      },
    ];
  }, [theme.errorColor, theme.primaryColor, handleMessageToFriend]);

  return actions;
};

export default useListFriendAction;
