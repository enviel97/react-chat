import { breakpoint } from "@theme/helper/breakpoint";
import { zIndex } from "@common/zIndex.define";
import styled from "styled-components";

export const ChannelContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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

  & span {
    font-weight: normal;
    font-size: 1.2rem;
  }
`;

export const ChannelBodyContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-weight: normal;
  overflow: hidden;
  height: 100%;
`;

export const ChannelMessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
  gap: 0.25em;
  width: 100%;
  height: fit-content;
  max-height: 100svh;
  padding: 3em 0.5em 1em;
  ${breakpoint.down("tablet")} {
    max-height: 70svh;
  }
  ${breakpoint.down("mobile")} {
    max-height: 68svh;
  }
`;
