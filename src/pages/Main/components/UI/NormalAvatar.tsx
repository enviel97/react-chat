import NetworkImage from "@components/Image/NetworkImage";
import { avatarUrlImage } from "@utils/image";
import { FC, useMemo } from "react";

interface NormalAvatarProps {
  friendAvatarId?: string;
}

const NormalAvatar: FC<NormalAvatarProps> = ({ friendAvatarId }) => {
  const url = useMemo(() => {
    if (!friendAvatarId) return;
    return avatarUrlImage(friendAvatarId);
  }, [friendAvatarId]);
  return (
    <NetworkImage
      src={url?.src}
      srcset={url?.srcset}
      sizes={url?.sizes}
      alt='Avatar'
      showLoading
    />
  );
};
export default NormalAvatar;
