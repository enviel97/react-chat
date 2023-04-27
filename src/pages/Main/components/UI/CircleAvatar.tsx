import styled from "styled-components";
import { colorBrightness, pxToEm } from "@theme/helper/tools";
import { FC, memo, useEffect, useState } from "react";
import string from "@utils/string";
import local from "@common/local.define";
import { State } from "@store/common/state";
import { isError } from "@utils/validate";
import { BiError } from "react-icons/bi";
import NetworkImage from "@components/Image/NetworkImage";
import { avatarUrlImage } from "@utils/image";

interface CircleAvatarDecorate {
  size?: number;
  mainColor?: string;
  online?: boolean;
}

interface CircleAvatarAtr {
  className?: string;
  src?: string;
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
  online,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgLoaded, setImgLoaded] = useState<State>(State.IDLE);
  const _size = pxToEm(size ?? 36);

  useEffect(() => {
    if (!src) return;
    if (src.includes("http")) setImgSrc(src);
    else {
      const avatar = avatarUrlImage(src);
      setImgSrc(avatar.srcset.md);
    }
  }, [src]);

  return (
    <CircleAvatarContainer
      className={string.classList(className)}
      mainColor={mainColor}
      size={size}
      online={online}
    >
      <NetworkImage
        key={"CircleAvatar"}
        src={imgSrc}
        placeholder={local.image.UnknownAvatar}
        height={_size}
        width={_size}
        onLoadedError={() => setImgLoaded(State.ERROR)}
        onLoadedSuccess={() => setImgLoaded(State.FULFILLED)}
        alt=''
      />
      {isError(imgLoaded) && <BiError color='red' />}
    </CircleAvatarContainer>
  );
};

export default memo(CircleAvatar);
