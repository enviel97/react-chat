import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import { breakpoint } from "@theme/helper/breakpoint";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { acceptLight } from "./animate";

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

export const CallingActionContainer = styled.div`
  position: absolute;
  top: 1em;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.25em;
  width: 100%;
  max-width: 18em;
  padding: 0 1em;
  border-radius: 100px;
  gap: 0.5rem;
  user-select: none;
  background-color: var(--background-color);
  box-shadow: ${CallNotificationContainerShadow};
  margin-bottom: 1em;
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
