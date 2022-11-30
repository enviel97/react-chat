import styled from "styled-components";

export const ChannelContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChannelHeaderContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  padding: 0.8rem 1rem;
  font-weight: bold;

  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0 1rem 1rem ${({ theme }) => theme.black};
  z-index: 100000;
  & .channelName {
    font-size: inherit;
  }
`;

export const ChannelBodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: normal;
`;

export const ChannelMessageContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5em;
`;

export const ChannelFormContainer = styled.div`
  border-top: 2px solid ${({ theme }) => theme.surfaceColor};
  margin: 0 1rem;
  padding: 1em 5px 5px 5px;
  & .form {
    display: flex;
    flex-direction: row;
    padding: 1em;
    font-weight: normal;
    gap: 1em;
  }
`;
