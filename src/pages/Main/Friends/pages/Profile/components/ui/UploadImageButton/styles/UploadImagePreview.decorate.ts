import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface NotificationProps {
  $hasPreview: boolean;
}

export const UploadImagePreviewerContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0.5px solid ${({ theme }) => theme.backgroundColor};
  box-shadow: inset -0.5rem -0.5rem 0.5rem -1px ${({ theme }) => colorBrightness(theme.backgroundColor, -0.5)},
    inset 0.5rem 0.5rem 0.5rem -1px ${({ theme }) => colorBrightness(theme.backgroundColor, +10)};
`;

export const UploadImageInput = styled.div<NotificationProps>`
  position: absolute;
  color: ${({ theme }) => theme.onBackgroundColor};
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  width: 100%;

  ${({ $hasPreview }) => {
    if ($hasPreview) {
      return css`
        align-items: flex-end;
        justify-content: flex-end;
      `;
    }
    return css`
      align-items: center;
      justify-content: center;
    `;
  }}

  & > input {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
`;

export const UploadImageNotificationContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UploadImageNotificationText = styled(motion.span)``;

export const IconBox = styled(motion.div)`
  ${({ theme }) => {
    const color = theme.backgroundColor;
    return css`
      filter: drop-shadow(0px 0px 1px ${color})
        drop-shadow(0px 0px 2px ${color}) drop-shadow(0px 0px 3px ${color});
    `;
  }}
`;

export const PreviewContainer = styled(motion.img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
