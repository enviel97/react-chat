import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface ImageContainerProps {
  $isPlaceholder?: boolean;
}

export const ControllerLazyLoadImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: inline-block;
  overflow: hidden;
  line-height: 0;
  background-color: ${({ theme }) => theme.backgroundColor};

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
`;

export const ImageContainer = styled.img<ImageContainerProps>`
  width: 100%;
  height: 100%;
  ${({ $isPlaceholder }) => {
    if ($isPlaceholder) {
      return css`
        object-fit: contain;
        object-position: center;
      `;
    }
    return css`
      object-fit: cover;
      object-position: center;
    `;
  }}
  mix-blend-mode: none;
  border: none;
  outline: none;
  filter: blur(0.2px) brightness(104%) contrast(120%) grayscale(25%)
    hue-rotate(0deg) invert(0%) opacity(100%) saturate(105%) sepia(0%);
`;
