import styled, { css } from "styled-components";

interface ImageProps {
  $state: LoadState;
}

export const NormalImageWrapper = styled.div``;

export const Placeholder = styled.span`
  position: absolute;
  background-color: ${({ theme }) => `${theme.backgroundColor}80`};
  border-radius: inherit;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  z-index: 1;
`;

export const NormalImageContainer = styled.div<ImageProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  & ${NormalImageWrapper} {
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background-size: cover !important;
    background-position: center;

    ${({ $state }) => {
      if ($state === "error")
        return css`
          filter: blur(0) !important;
        `;
      return css``;
    }}
  }

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
