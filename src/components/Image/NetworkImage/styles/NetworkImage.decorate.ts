import styled, { css } from "styled-components";

interface ImageContainerProps {
  $isLoading?: boolean;
  $isError?: boolean;
  $isPlaceholder?: boolean;
}

export const ControllerLazyLoadImage = styled.div`
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
    mix-blend-mode: multiply;
    background: #f6ddbf;
    opacity: 0.13;
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

  /* filter: blur(0.5px) brightness(135%) contrast(88%) opacity(100%) saturate(80%)
    sepia(21%); */
  filter: blur(0.5px) brightness(104%) contrast(104%) grayscale(10%)
    hue-rotate(0deg) invert(0%) opacity(100%) saturate(122%) sepia(0%);
  ${({ $isLoading, $isError }) => {
    if ($isLoading && !$isError) {
      return css`
        filter: blur(20px);
      `;
    }
    return css``;
  }};
`;
