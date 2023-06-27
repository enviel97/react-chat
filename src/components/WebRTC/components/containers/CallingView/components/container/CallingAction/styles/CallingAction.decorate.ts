import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import styled from "styled-components";

export const CallingActionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  background-color: var(--background-color);
  border-radius: 100px;
  margin-top: 1em;
  display: flex;
  height: 5%;
  width: 250px;
  border-top: 10%;
  padding: 0 1em;
  gap: 0.5rem;

  align-items: center;
  justify-content: center;
  box-shadow: ${CallNotificationContainerShadow};
`;

export const CallingVideoActionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1em;
  gap: 0.5em;
  height: 100%;
  border-right: 3px solid var(--surface-color);
`;

export const StatusContainer = styled.div`
  flex: 1;
  position: relative;
  text-transform: uppercase;
  height: 100%;
  width: fit-content;
  display: flex;
  justify-content: center;
  font-weight: 900;
  align-items: center;

  color: #f40000;
  text-shadow: 0 0 1rem currentColor;
  border-right: 2px solid var(--surface-color);

  &::before {
    content: "";
    height: 20%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: none;

    background-color: currentColor;
    margin: 0.5rem;
    box-shadow: 0 0 0.5em currentColor, 0 0 1em currentColor,
      0 0 1.5em currentColor;
  }
`;
