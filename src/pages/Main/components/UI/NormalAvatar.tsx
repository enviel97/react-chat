import local from "@common/local.define";
import NetworkImage from "@components/Image/NetworkImage";
import useAvatarSrc from "@pages/Main/hooks/useAvatarSrc";
import { FC } from "react";

interface NormalAvatarProps {
  friendAvatarId?: string;
}

const NormalAvatar: FC<NormalAvatarProps> = ({ friendAvatarId }) => {
  const { avatar } = useAvatarSrc(friendAvatarId);

  return (
    <NetworkImage
      src={avatar}
      placeholder={local.image.UnknownAvatar}
      type='avatar'
      alt=''
    />
  );
};
export default NormalAvatar;
