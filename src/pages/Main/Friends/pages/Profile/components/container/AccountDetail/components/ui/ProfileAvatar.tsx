import local from "@common/local.define";
import { Event } from "@common/socket.define";
import NetworkImage from "@components/Image/NetworkImage";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { avatarUrlImage } from "@utils/image";
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

const ProfileAvatar: FC<Props> = ({ avatarSrc }) => {
  const [avatar, setAvatar] = useState<string | undefined>(avatarSrc);
  const breakpoint = useBreakpoint();
  const [isHover, setHover] = useState(false);
  const socket = useSocket();
  const isShowUploadButton = useMemo(
    () => isHover || breakpoint.down("laptop"),
    [breakpoint, isHover]
  );

  useEffect(() => {
    socket.on(Event.IMAGE_UPLOAD_AVATAR_ERROR, (payload) => {
      console.log(payload);
    });
    return () => {
      socket.off(Event.IMAGE_UPLOAD_AVATAR_ERROR);
    };
  }, [socket]);

  useEffect(() => {
    if (!avatarSrc) return;
    if (avatarSrc.includes("http")) {
      setAvatar(avatarSrc);
    } else {
      const avatar = avatarUrlImage(avatarSrc);
      setAvatar(avatar.src);
    }
  }, [avatarSrc]);

  const handleUploadSuccess = (src: string) => {
    setAvatar(src);
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
          placeholder={local.image.UnknownAvatar}
          src={avatar}
          viewPort={"md"}
        />
      </AvatarBox>
    </AnimatePresence>
  );
};

export default memo(ProfileAvatar);
