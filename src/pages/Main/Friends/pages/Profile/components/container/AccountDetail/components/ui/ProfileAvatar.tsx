import NetworkImage from "@components/Image/NetworkImage";
import useBreakpoint from "@hooks/useBreakpoint";
import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useEffect, useState } from "react";
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
  const [src, setSrc] = useState(avatarSrc);
  const breakpoint = useBreakpoint();
  const [isHover, setHover] = useState(false);
  const handleUploadSuccess = (src: string) => {
    setSrc(src);
  };

  useEffect(() => {
    return () => {
      if (src?.includes("blob")) {
        URL.revokeObjectURL(src);
      }
    };
  }, [src]);
  const a = isHover || breakpoint.down("laptop");
  return (
    <AnimatePresence>
      <AvatarBox
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        {a && (
          <UploadImageButton
            separateSpace='0.5rem'
            size='1.5rem'
            type='avatar'
            onUploadSuccess={handleUploadSuccess}
          />
        )}
        <NetworkImage src={src} />
      </AvatarBox>
    </AnimatePresence>
  );
};

export default memo(ProfileAvatar);
