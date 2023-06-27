import styled from "styled-components";
import { colorBrightness, pxToEm } from "@theme/helper/tools";
import { FC, memo, useState } from "react";
import string from "@utils/string";
import local from "@common/local.define";
import { State } from "@store/common/state";
import { isError } from "@utils/validate";
import { BiError } from "react-icons/bi";
import useAvatarSrc from "@pages/Main/hooks/useAvatarSrc";
import { CacheImage } from "@components/Image";

interface CircleAvatarDecorate {
  size?: number;
  mainColor?: string;
  online?: boolean;
}

interface CircleAvatarAtr {
  className?: string;
  src?: string;
  viewPort?: ViewPort;
}

type CircleAvatarProps = CircleAvatarAtr & CircleAvatarDecorate;

const CircleAvatarContainer = styled.div<CircleAvatarDecorate>`
  position: relative;
  height: ${({ size }) => pxToEm(size ?? 36)};
  aspect-ratio: 1;
  color: ${({ mainColor, theme }) => mainColor ?? theme.disableColor};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  box-shadow: 0.1rem 0.1rem 0.5rem
      ${({ theme }) => colorBrightness(theme.backgroundColor, 10)},
    -0.1rem -0.1rem 0.5rem
      ${({ theme }) => colorBrightness(theme.backgroundColor, -10)};

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
    border-radius: 50%;
    background-color: ${({ theme, online }) =>
      online ? "#16FF00" : theme.backgroundColor};

    box-shadow: 0.12em 0.12em 0.25em
        ${({ theme }) => colorBrightness(theme.backgroundColor, 15)},
      -0.12em -0.12em 0.25em
        ${({ theme }) => colorBrightness(theme.backgroundColor, 15)},
      -0.12em -0.12em 0.25em
        ${({ theme }) => colorBrightness(theme.backgroundColor, -10)},
      -0.12em -0.12em 0.5em
        ${({ theme }) => colorBrightness(theme.backgroundColor, -10)};
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const CircleAvatar: FC<CircleAvatarProps> = ({
  size,
  className = "",
  mainColor,
  src,
  viewPort,
  online,
}) => {
  const [imgLoaded, setImgLoaded] = useState<State>(State.IDLE);
  const _size = pxToEm(size ?? 36);
  const { avatar } = useAvatarSrc(src);

  return (
    <CircleAvatarContainer
      className={string.classList(className)}
      mainColor={mainColor}
      size={size}
      online={online}
    >
      <CacheImage
        src={avatar}
        placeholder={local.image.UnknownAvatar}
        height={_size}
        width={_size}
        viewPort={viewPort}
        onLoadedError={() => setImgLoaded(State.ERROR)}
        onLoadedSuccess={() => setImgLoaded(State.FULFILLED)}
        type={"avatar"}
        alt='avatar'
      />
      {isError(imgLoaded) && <BiError color='red' />}
    </CircleAvatarContainer>
  );
};

export default memo(CircleAvatar);
