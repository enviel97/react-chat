import styled from "styled-components";
import { colorBrightness, pxToEm } from "@theme/helper/tools";
import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC, memo, useEffect, useState } from "react";
import string from "@utils/string";
import local from "@common/local.define";

interface CircleAvatarDecorate {
  size?: number;
  mainColor?: string;
}

interface CircleAvatarAtr {
  className?: string;
  src?: string;
  isLoading?: boolean;
}

type CircleAvatarProps = CircleAvatarAtr & CircleAvatarDecorate;

const CircleAvatarContainer = styled.div<CircleAvatarDecorate>`
  height: ${({ size }) => pxToEm(size ?? 36)};
  aspect-ratio: 1;
  color: ${({ mainColor, theme }) => mainColor ?? theme.disableColor};
  background-color: currentColor;
  border-radius: 50%;
  border: 2px solid currentColor;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &.story {
    border-radius: 50%;
    border: 2px solid
      ${({ mainColor, theme }) =>
        colorBrightness(mainColor ?? theme.primaryColor, 50)};
  }

  & img {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
    transition: opacity 1s cubic-bezier(0, 0, 0, 1);

    &.loaded {
      opacity: 1;
    }
  }
`;

const CircleAvatar: FC<CircleAvatarProps> = ({
  size,
  className = "",
  mainColor,
  isLoading,
  src,
}) => {
  const [imgSrc, setImgSrc] = useState(local.image.UnknownAvatar);
  const [imgLoaded, setImgLoaded] = useState(false);
  const _size = pxToEm(size ?? 36);

  useEffect(() => {
    if (!src) {
      setImgLoaded(true);
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setImgLoaded(true);
    };
  }, [src]);

  return (
    <SkeletonContainer height={_size}>
      <SkeletonElement
        height={_size}
        width={_size}
        isLoading={isLoading}
        circle
      >
        <CircleAvatarContainer
          className={string.classList(className)}
          mainColor={mainColor}
          size={size}
        >
          <img
            className={string.classList(imgLoaded && "loaded")}
            src={imgSrc}
            alt=''
          />
        </CircleAvatarContainer>
      </SkeletonElement>
    </SkeletonContainer>
  );
};

export default memo(CircleAvatar);
