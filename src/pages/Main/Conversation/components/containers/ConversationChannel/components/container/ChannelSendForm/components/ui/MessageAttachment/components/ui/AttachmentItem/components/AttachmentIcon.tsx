import { colorBrightness } from "@theme/helper/tools";
import { FC, memo } from "react";
import { FiFile } from "react-icons/fi";
import styled, { css } from "styled-components";

interface AttachmentIconProps {
  name: string;
}

interface PAfterProps {
  $text: string;
}

const AttachmentIconPreview = styled.div<PAfterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 10%;

  ${({ theme }) => {
    const backgroundColor = theme.surfaceColor;
    const mainColor = theme.surfaceColor;

    return css`
      background-color: ${backgroundColor};
      color: ${({ theme }) => theme.white};
      box-shadow: -0.2rem -0.2rem 0.1rem ${colorBrightness(mainColor, 10)},
        0.2rem 0.2rem ${colorBrightness(mainColor, -10)};
    `;
  }}

  &::after {
    position: absolute;
    bottom: 0;
    content: "${({ $text }) => `.${$text}`}";
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.surfaceColor};
    text-shadow: 2px 0 ${({ theme }) => theme.white},
      -2px 0 ${({ theme }) => theme.white}, 0 2px ${({ theme }) => theme.white},
      0 -2px ${({ theme }) => theme.white},
      1px 1px ${({ theme }) => theme.white},
      -1px -1px ${({ theme }) => theme.white},
      1px -1px ${({ theme }) => theme.white},
      -1px 1px ${({ theme }) => theme.white};
  }
`;

const AttachmentIcon: FC<AttachmentIconProps> = ({ name }) => {
  return (
    <AttachmentIconPreview $text={name.split(".").at(-1) ?? "unknown"}>
      <FiFile size={"80%"} strokeWidth='1px' />
    </AttachmentIconPreview>
  );
};

export default memo(AttachmentIcon);
