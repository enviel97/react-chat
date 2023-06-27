import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import styled from "styled-components";

export const PersonCallContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  background-color: var(--surface-color);
  height: 100%;
  overflow: hidden;
  height: 100%;
`;

export const PersonCallActionGroups = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 1rem 0;
  display: flex;
  padding: 1rem;
  height: 3rem;
  width: 60%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 500px;
  background-color: var(--background-color);
  box-shadow: ${CallNotificationContainerShadow};
`;

export const PersonCallAction = styled.div`
  display: flex;
  flex: 1;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
