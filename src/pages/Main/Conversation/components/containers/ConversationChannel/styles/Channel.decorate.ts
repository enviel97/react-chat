import { breakpoint } from "@theme/helper/breakpoint";
import { zIndex } from "@common/zIndex.define";
import styled from "styled-components";

export const ChannelContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${breakpoint.down("tablet")} {
    height: calc(100% - 8.5em);
  }
`;

export const ChannelHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  padding: 0.8rem 1rem;
  font-weight: bold;

  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0 1rem 1rem ${({ theme }) => theme.black};
  z-index: ${zIndex.ChannelHeader};
  & h4 {
    font-weight: normal;
    font-size: inherit;
  }
`;

export const ChannelBodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: normal;
  overflow: hidden;
`;

export const ChannelMessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 100%;
  width: 100%;
  overflow-y: auto;
  gap: 0.25em;
  padding: 4em 1em 1em;
  ${breakpoint.down("mobile")} {
    padding: 4em 0.5em 1em;
  }
`;

export const ChannelFormContainer = styled.div`
  position: relative;
  height: fit-content;
  border-top: 2px solid ${({ theme }) => theme.surfaceColor};
  margin: 0 1rem;
  padding: 1em 5px;
  gap: 1px;
`;

export const ChannelForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  flex: 1;
`;

export const ChannelSendingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  font-weight: normal;
  align-items: center;
  gap: 1em;
`;
