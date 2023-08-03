import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { acceptLight } from "./CallingAction.animate";

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
  user-select: none;

  align-items: center;
  justify-content: center;
  box-shadow: ${CallNotificationContainerShadow};
`;

export const StatusContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  text-transform: uppercase;
  height: 100%;
  width: fit-content;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  border-right: 2px solid var(--surface-color);
`;

/**
 * Status Container
 */
interface StatusContainerProps {
  $status: CallStatus;
}
export const CallingActionLight = styled.div<StatusContainerProps>`
  position: absolute;
  left: 0;
  height: 20%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: none;
  background-color: currentColor;

  ${({ $status, theme }) => {
    switch ($status) {
      case "ended":
      case "error":
        return css`
          background-color: ${theme.notificationColor};
        `;
      case "calling":
      case "answer":
        return css`
          background-color: ${theme.successColor};
          animation: ${acceptLight} 2s linear infinite;
        `;

      default:
        return css`
          background-color: ${theme.gray};
        `;
    }
  }}
`;

export const CallingActionNotification = styled(motion.span)`
  color: var(--gray);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
