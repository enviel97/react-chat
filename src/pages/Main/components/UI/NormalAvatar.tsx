import local from "@common/local.define";
import NetworkImage from "@components/Image/NetworkImage";
import { avatarUrlImage } from "@utils/image";
import { FC, useEffect, useState } from "react";

interface NormalAvatarProps {
  friendAvatarId?: string;
}

const NormalAvatar: FC<NormalAvatarProps> = ({ friendAvatarId }) => {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!friendAvatarId) return;
    const avatar = avatarUrlImage(friendAvatarId);
    setSrc(avatar.srcset.md);
  }, [friendAvatarId]);

  return (
    <NetworkImage src={src} placeholder={local.image.UnknownAvatar} alt='' />
  );
};
export default NormalAvatar;
