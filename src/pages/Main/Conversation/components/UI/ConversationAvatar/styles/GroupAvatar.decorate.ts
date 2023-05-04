import { colorBrightness } from "@theme/helper/tools";
import styled, { css } from "styled-components";

interface GroupAvatarContainerProps {
  $size: string;
}

interface AvatarContainerProps {
  $identity: number;
}

export const GroupAvatarContainer = styled.div<GroupAvatarContainerProps>`
  position: relative;
  aspect-ratio: 1;
  color: ${({ theme }) => theme.disableColor};
  box-shadow: 0.1rem 0.1rem 0.5rem
      ${({ theme }) => colorBrightness(theme.backgroundColor, 10)},
    -0.1rem -0.1rem 0.5rem
      ${({ theme }) => colorBrightness(theme.backgroundColor, -10)};
  border-radius: 50%;
  ${({ $size, theme }) => {
    return css`
      height: ${$size};
    `;
  }};
`;

export const AvatarContainer = styled.div<AvatarContainerProps>`
  position: absolute;

  ${({ $identity }) => {
    switch ($identity % 4) {
      case 0:
        return css`
          top: 0;
          left: 0;
        `;
      case 1:
        return css`
          top: 0;
          right: 0;
        `;
      case 2:
        return css`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
    }
  }};
`;

export const AvatarCount = styled.div`
  position: absolute;
  right: -0.25em;
  bottom: -0.25em;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  height: 1.2rem;

  padding: 0.2em;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.onBackgroundColor};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
`;
