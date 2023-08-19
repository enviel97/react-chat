import useNameChannel from "@pages/Main/Conversation/hooks/useNameChannel";
import string from "@utils/string";
import { FC } from "react";
import styled from "styled-components";

interface HeaderConversationProps {
  conversationId: string;
}

const HeaderConversationContainer = styled.span`
  display: -webkit-box;
  flex: 1;
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
    <HeaderConversationContainer>
      {conversationName}
    </HeaderConversationContainer>
  );
};

export default HeaderConversation;
