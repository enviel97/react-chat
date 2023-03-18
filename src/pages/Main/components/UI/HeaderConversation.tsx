import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import useNameChannel from "@pages/Main/hooks/useNameChannel";
import string from "@utils/string";
import { FC } from "react";
import styled from "styled-components";

interface HeaderConversationProps {
  conversationId: string;
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
  conversationId,
}) => {
  const conversationName = useNameChannel(string.getId(conversationId));

  return (
    <SkeletonContainer>
      <SkeletonElement isLoading={!conversationId}>
        <HeaderConversationContainer>
          {conversationName}
        </HeaderConversationContainer>
      </SkeletonElement>
    </SkeletonContainer>
  );
};

export default HeaderConversation;
