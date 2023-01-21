import styled from "styled-components";
import { colorBrightness, pxToEm } from "@common/helper/tools";
import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC } from "react";
import string from "@utils/string";

interface CircleAvatarProps {
  size?: number;
  mainColor?: string;
  className?: string;
  src?: string;
  isLoading?: boolean;
}

const CircleAvatarContainer = styled.div<CircleAvatarProps>`
  width: ${({ size }) => pxToEm(size ?? 36)};
  aspect-ratio: 1;
  color: ${({ mainColor, theme }) => mainColor ?? theme.primaryColor};
  background-color: currentColor;
  border-radius: 50%;
  border: 2px solid currentColor;
  cursor: pointer;

  &.story {
    border-radius: 50%;
    border: 2px solid
      ${({ mainColor, theme }) =>
        colorBrightness(mainColor ?? theme.primaryColor, 50)};
  }

  & img {
    height: 100%;
    width: 100%;
    border-color: red;
    border-radius: 50%;
  }
`;

const CircleAvatar: FC<CircleAvatarProps> = ({
  size,
  className = "",
  mainColor,
  isLoading,
  src,
}) => {
  return (
    <SkeletonContainer height={pxToEm(size ?? 36)}>
      <SkeletonElement width={pxToEm(size ?? 36)} isLoading={isLoading} circle>
        <CircleAvatarContainer
          className={string.classList(className)}
          mainColor={mainColor}
          size={size}
        />
      </SkeletonElement>
    </SkeletonContainer>
  );
};

export default CircleAvatar;
