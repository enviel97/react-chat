import styled from "styled-components";

export const Panel = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100svh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
`;

export const UnselectedConversation = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
