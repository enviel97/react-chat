import local from "@common/local.define";
import NetworkImage from "@components/Image/NetworkImage";
import useBreakpoint from "@hooks/useBreakpoint";
import useAvatarSrc from "@pages/Main/hooks/useAvatarSrc";
import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useCallback, useMemo, useState } from "react";
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

const ProfileAvatar: FC<Props> = ({ avatarSrc }) => {
  const breakpoint = useBreakpoint();
  const [isHover, setHover] = useState(false);
  const { avatar, setImageSrc } = useAvatarSrc(avatarSrc);
  const isShowUploadButton = useMemo(
    () => isHover || breakpoint.down("laptop"),
    [breakpoint, isHover]
  );

  const handleUploadSuccess = useCallback(
    (src: string) => {
      setImageSrc(src);
    },
    [setImageSrc]
  );

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
          placeholder={local.image.UnknownAvatar}
          src={avatar}
          viewPort={"sm"}
        />
      </AvatarBox>
    </AnimatePresence>
  );
};

export default memo(ProfileAvatar);
