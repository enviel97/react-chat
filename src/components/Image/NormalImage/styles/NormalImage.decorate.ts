import styled from "styled-components";

interface ImageProps {
  $height?: string;
  $width?: string;
}

export const NormalImageWrapper = styled.div``;

export const NormalImageContainer = styled.div<ImageProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.disableColor};
  & ${NormalImageWrapper} {
    height: 100%;
    width: 100%;
  }

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
