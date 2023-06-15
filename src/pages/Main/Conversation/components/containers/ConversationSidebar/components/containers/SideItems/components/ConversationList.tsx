import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversations/selectors/getConversationSelector";
import { memo } from "react";
import Item from "./item";
import styled from "styled-components";
import { breakpoint } from "@theme/helper/breakpoint";
import useSideConversationAction from "../hooks/useSideConversationAction";
import { selectConversationType } from "@store/slices/ui";
import ContextMenuProvider from "@components/Select/ContextMenu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  ${breakpoint.down("tablet")} {
    flex-direction: row;
  }
`;

const ConversationList = () => {
  const actions = useSideConversationAction();
  const type = useAppSelector(selectConversationType);
  const conversationIds = useAppSelector(selectConversationIds);
  return (
    <ContextMenuProvider
      menuTitle='Actions'
      menuItem={actions}
      disable={type !== "group"}
    >
      <Container>
        {conversationIds.map((id) => (
          <Item key={id} conversationId={`${id}`} />
        ))}
      </Container>
    </ContextMenuProvider>
  );
};
export default memo(ConversationList);
