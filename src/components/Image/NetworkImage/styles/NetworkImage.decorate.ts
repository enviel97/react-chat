import styled, { css } from "styled-components";

interface PlaceholderContainerProps {
  $isLoading?: boolean;
  $isError?: boolean;
}
export const RandomName = styled.div``;

export const ControllerLazyLoadImage = styled.div`
  width: 100%;
  height: 100%;

  & ${RandomName} {
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      object-fit: contain;
    }
  }
`;

export const PlaceholderContainer = styled.img<PlaceholderContainerProps>`
  height: 100%;
  width: 100%;
  object-position: center;
  object-fit: contain;

  ${({ $isLoading, $isError }) => {
    if ($isLoading && !$isError) {
      return css`
        filter: blur(20px);
      `;
    }
    return css`
      filter: blur(1px);
    `;
  }}
`;
