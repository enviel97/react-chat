import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import useAuthenticate from "@hooks/useAuthenticate";
import string from "@utils/string";
import { FC, useMemo } from "react";
import styled from "styled-components";

interface HeaderConversationProps {
  channel?: Conversation;
  className?: string;
}

const HeaderConversationContainer = styled.h4`
  display: -webkit-box;
  align-items: center;
  flex: 1;
  font-size: 0.8em;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 1;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const HeaderConversation: FC<HeaderConversationProps> = ({
  channel,
  className,
}) => {
  const { isUser } = useAuthenticate();

  const conversationName = useMemo(() => {
    if (!channel) return "";
    const members = channel.participant.members;
    if (members.length > 2) {
      return "Group of " + members.map((mem) => mem.lastName).join(", ");
    }
    return isUser(members[0])
      ? string.getFullName(members[1])
      : string.getFullName(members[0]);
  }, [channel, isUser]);

  return (
    <SkeletonContainer>
      <SkeletonElement isLoading={!channel}>
        <HeaderConversationContainer className={className}>
          {conversationName}
        </HeaderConversationContainer>
      </SkeletonElement>
    </SkeletonContainer>
  );
};

export default HeaderConversation;
