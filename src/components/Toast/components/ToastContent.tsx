import { FC } from "react";
import styled from "styled-components";

const ToastContentContainer = styled.div`
  & span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.onBackgroundColor};
    font-weight: 300;
    & strong,
    & b {
      font-size: 1.1rem;
      color: ${({ theme }) => theme.notificationColor};
      font-weight: bold;
    }
  }
`;

export const ToastContent: FC<Components> = ({ children }) => {
  return (
    <ToastContentContainer>
      <span>{children}</span>
    </ToastContentContainer>
  );
};
