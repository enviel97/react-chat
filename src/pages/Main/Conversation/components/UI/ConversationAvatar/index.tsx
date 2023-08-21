import useAppSelector from "@hooks/useAppSelector";
import { FC, memo } from "react";
import { selectAvatarConversationById } from "@store/slices/conversations";
import DirectAvatar from "./components/DirectAvatar";
import GroupAvatar from "./components/GroupAvatar";
import AvatarLoading from "./components/AvatarLoading";
import styled from "styled-components";
import { breakpoint } from "@theme/helper/breakpoint";

interface ConversationAvatarProps {
  conversationId: string;
}

const ConversationSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 2.5em;
  aspect-ratio: 1/1;

  ${breakpoint.down("tablet")} {
    height: 3em;
  }
`;

const ConversationAvatar: FC<ConversationAvatarProps> = ({
  conversationId,
}) => {
  const conversationAvatars = useAppSelector((state) =>
    selectAvatarConversationById(state, conversationId)
  );

  if (!conversationAvatars) {
    return (
      <ConversationSize>
        <AvatarLoading />
      </ConversationSize>
    );
  }
  return (
    <ConversationSize>
      {conversationAvatars.length > 1 && (
        <GroupAvatar avatarIds={conversationAvatars} />
      )}
      {conversationAvatars.length <= 1 && (
        <DirectAvatar avatarId={conversationAvatars.at(0)} size={"100%"} />
      )}
    </ConversationSize>
  );
};

export default memo(ConversationAvatar);
