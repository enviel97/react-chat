import styled, { css } from "styled-components";

interface PlaceholderContainerProps {
  $isLoading?: boolean;
  $isError?: boolean;
}
export const RandomName = styled.div``;

export const ControllerLazyLoadImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & ${RandomName} {
    height: 100%;
    width: 100%;
    min-height: 50px;
    min-width: 50px;
    & > img {
      width: 100%;
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
  }};
`;
