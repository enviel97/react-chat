import styled from "styled-components";
import { colorBrightness, pxToRem } from "@common/helper/tools";

interface CircleAvatarProps {
  size?: number;
  mainColor?: string;
  className?: string;
}

const CircleAvatarContainer = styled.div<CircleAvatarProps>`
  height: ${({ size }) => pxToRem(size ?? 36)};
  aspect-ratio: 1/1;
  color: ${({ mainColor, theme }) => mainColor ?? theme.primaryColor};
  background-color: currentColor;
  border-radius: 50%;
  border: 2px solid currentColor;
  cursor: pointer;

  &.story {
    border: 2px solid
      ${({ mainColor, theme }) =>
        colorBrightness(mainColor ?? theme.primaryColor, 50)};
  }
`;

const CircleAvatar = (props: CircleAvatarProps) => {
  return (
    <CircleAvatarContainer
      className={`${props.className}`}
    ></CircleAvatarContainer>
  );
};

export default CircleAvatar;
