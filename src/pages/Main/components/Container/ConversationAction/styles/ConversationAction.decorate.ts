import styled from "styled-components";

export const ConversationSidebarContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  gap: 1em;
  padding: 1rem;
  border-right: 2.5px solid ${({ theme }) => theme.surfaceColor};
`;

export const ConversationActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
