import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo } from "react";

interface DirectAvatarProps {
  avatarId?: string;
  size?: string | number;
}

const DirectAvatar: FC<DirectAvatarProps> = ({ avatarId, size = 40 }) => {
  return <CircleAvatar className='avatar' src={avatarId} size={size} />;
};

export default memo(DirectAvatar);
