import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import { TiEject, TiArchive } from "react-icons/ti";
import useLeavingChannel from "@pages/Main/Conversation/hooks/useLeavingChannel";
import string from "@utils/string";

const useSideConversationAction = () => {
  const theme = useTheme();
  const leavingChannelHandler = useLeavingChannel();

  const handleLeaveGroup = useCallback(
    (value: Conversation) => {
      leavingChannelHandler(string.getId(value));
    },
    [leavingChannelHandler]
  );

  const actions = useMemo<ContextMenuOption[]>(() => {
    return [
      {
        icon: <TiEject size={16} />,
        label: "Leave group",
        onClick: handleLeaveGroup,
        hoverColor: theme.errorColor,
      },
      {
        icon: <TiArchive size={16} />,
        label: "Archive group",
        onClick: (value?: Conversation) => {
          console.log(value);
        },
        hoverColor: theme.primaryColor,
      },
    ];
  }, [theme.errorColor, theme.primaryColor, handleLeaveGroup]);

  return actions;
};

export default useSideConversationAction;
