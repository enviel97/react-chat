import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import styled from "styled-components";

export const PersonCallContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const PersonCallActionGroups = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  background-color: transparent;
`;

export const PersonCallAction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: var(--background-color);
  border-radius: 500px;
  width: 60%;
  gap: 1rem;
  box-shadow: ${CallNotificationContainerShadow};
`;
