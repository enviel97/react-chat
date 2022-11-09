import styled from "styled-components";

export const ChannelContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const ChannelHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  padding: 0.8rem 1rem;
  font-weight: bold;

  & .channelName {
    font-size: inherit;
  }
`;
