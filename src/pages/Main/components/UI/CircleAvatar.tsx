import styled from "styled-components";
import { colorBrightness, pxToEm } from "@theme/helper/tools";
import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC, memo, useMemo, useState } from "react";
import string from "@utils/string";
import local from "@common/local.define";
import { State } from "@store/common/state";
import { isError, isSuccess } from "@utils/validate";
import { BiError } from "react-icons/bi";
import { avatarUrlImage } from "@utils/image";

interface CircleAvatarDecorate {
  size?: number;
  mainColor?: string;
  online?: boolean;
}

interface CircleAvatarAtr {
  className?: string;
  src?: string;
  isLoading?: boolean;
}

type CircleAvatarProps = CircleAvatarAtr & CircleAvatarDecorate;

const CircleAvatarContainer = styled.div<CircleAvatarDecorate>`
  position: relative;
  height: ${({ size }) => pxToEm(size ?? 36)};
  aspect-ratio: 1;
  color: ${({ mainColor, theme }) => mainColor ?? theme.disableColor};
  background-color: currentColor;
  border-radius: 50%;
  border: 2px solid currentColor;
  cursor: pointer;
  position: relative;

  &.story {
    border-radius: 50%;
    border: 2px solid
      ${({ mainColor, theme }) =>
        colorBrightness(mainColor ?? theme.primaryColor, 50)};
  }

  &.status::after {
    content: "";
    position: absolute;
    height: ${({ size }) => pxToEm((size ?? 36) / 3)};
    aspect-ratio: 1/1;
    bottom: -0.2em;
    right: -0.2em;
    border: 1px solid currentColor;
    border-radius: 50%;
    background-color: ${({ theme, online }) =>
      online ? "#16FF00" : theme.backgroundColor};
  }

  & svg {
    position: absolute;
    height: fit-content;
    width: fit-content;
    bottom: -15%;
    right: -15%;
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
  online,
}) => {
  const placeHolder = useMemo(() => {
    const placeHolder = local.image.UnknownAvatar;
    return placeHolder;
  }, []);
  const [imgSrc, setImgSrc] = useState(src ?? placeHolder);
  const [imgLoaded, setImgLoaded] = useState<State>(State.IDLE);
  const _size = pxToEm(size ?? 36);

  const srcUrl = useMemo(() => {
    if (!src) return { src: placeHolder, srcset: "", sizes: "" };
    return avatarUrlImage(src);
  }, [src, placeHolder]);

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
          online={online}
        >
          <img
            className={string.classList(
              (imgSrc === placeHolder || isSuccess(imgLoaded)) && "loaded"
            )}
            onLoad={({ currentTarget }) => {
              setImgSrc(currentTarget.currentSrc);
              setImgLoaded(State.FULFILLED);
            }}
            onError={() => {
              setImgLoaded(State.ERROR);
              setImgSrc(placeHolder);
            }}
            srcSet={srcUrl?.srcset}
            src={imgSrc}
            sizes={srcUrl?.sizes}
            alt=''
          />
          {isError(imgLoaded) && <BiError color='red' />}
        </CircleAvatarContainer>
      </SkeletonElement>
    </SkeletonContainer>
  );
};

export default memo(CircleAvatar);
