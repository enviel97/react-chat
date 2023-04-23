import NetworkImage from "@components/Image/NetworkImage";
import useAppDispatch from "@hooks/useAppDispatch";
import useBreakpoint from "@hooks/useBreakpoint";
import { deleteMultiCache } from "@store/slices/cache";
import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { avatarUrlImage, imageSize } from "@utils/image";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import UploadImageButton from "../../../../ui/UploadImageButton";

interface Props {
  avatarSrc?: string;
}
const AvatarBox = styled(motion.div)`
  position: relative;
  box-sizing: border-box;
  height: min(150px + 1svw, 20svw);
  aspect-ratio: 1/1;
  background-color: green;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1rem;
  border: 0.5rem solid ${({ theme }) => theme.backgroundColor};
  z-index: 1;
  box-shadow: ${({ theme }) =>
    neumorphismBoxShadowInset(undefined, {
      background: theme.surfaceColor,
    })};
`;

interface ImageSrc {
  src?: string;
  srcSet?: string;
  sizes?: string;
}

const ProfileAvatar: FC<Props> = ({ avatarSrc }) => {
  const [avatar, setAvatar] = useState<ImageSrc>({ src: avatarSrc });
  const [cache, setCache] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const breakpoint = useBreakpoint();
  const [isHover, setHover] = useState(false);
  const isShowUploadButton = useMemo(
    () => isHover || breakpoint.down("laptop"),
    [breakpoint, isHover]
  );
  useEffect(() => {
    if (!avatarSrc || avatarSrc.includes("http")) return;
    const avatar = avatarUrlImage(avatarSrc);
    setAvatar(avatar);
  }, [avatarSrc]);

  const handleUploadSuccess = (src: string) => {
    dispatch(
      deleteMultiCache({
        keys: imageSize.map((size) => `${avatarSrc}?size=${size}`),
      })
    );
    setAvatar({ src: src });
    setCache(false);
  };

  return (
    <AnimatePresence>
      <AvatarBox
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        {isShowUploadButton && (
          <UploadImageButton
            separateSpace='0.5rem'
            size='1.5rem'
            type='avatar'
            onUploadSuccess={handleUploadSuccess}
          />
        )}
        <NetworkImage
          src={avatar.src}
          srcset={avatar.srcSet}
          sizes={avatar.sizes}
          cache={cache}
        />
      </AvatarBox>
    </AnimatePresence>
  );
};

export default memo(ProfileAvatar);
