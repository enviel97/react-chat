import { clampSize, colorBrightness, imageFilter } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface NotificationProps {
  $hasPreview: boolean;
}

interface UploadImagePreviewContainerProps {
  $aspectRatio: "1/1" | "16/9";
}

export const UploadImagePreviewerContainer = styled.div<UploadImagePreviewContainerProps>`
  position: relative;
  height: ${clampSize({
    minWidth: 200,
    maxWidth: 320,
    minFontSize: 20,
    maxFontSize: 25,
  })};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
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

export const IconBox = styled(motion.div)`
  cursor: pointer;
  ${({ theme }) => {
    const color = theme.backgroundColor;
    return css`
      filter: drop-shadow(0px 0px 1px ${color})
        drop-shadow(0px 0px 2px ${color}) drop-shadow(0px 0px 3px ${color});
    `;
  }};
`;

export const UploadImageNotificationContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UploadImageNotification = styled(motion.span)`
  z-index: 1;
`;

export const PreviewContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: inline-block;
  overflow: hidden;
  line-height: 0;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    mix-blend-mode: soft-light;
    background: #f6ddbf;
    opacity: 0.23;
  }

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border: none;
    outline: none;
    mix-blend-mode: none;
    filter: ${imageFilter()};
  }
`;

export const UploadImageInput = styled.div<NotificationProps>`
  position: absolute;
  color: ${({ theme }) => theme.onBackgroundColor};
  font-weight: 300;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${({ $hasPreview }) => {
    if ($hasPreview) {
      return css`
        align-items: flex-end;
        justify-content: flex-end;
        padding: 1rem;
        & ${UploadImageNotificationContainer} {
          pointer-events: fill;
        }
      `;
    }
    return css`
      align-items: center;
      justify-content: center;
      & ${UploadImageNotificationContainer} {
        pointer-events: none;
      }
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
