import { Placeholder } from "@utils/styles";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  gap: 1em;
  padding: 1rem;
  border-right: 2.5px solid ${({ theme }) => theme.surfaceColor};
`;

export const SidebarActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const ActionContainer = styled.div`
  position: relative;
`;

export const ActionPlaceHolder = styled(Placeholder)`
  border-bottom: 3.5px solid var(--surface-color);
`;
