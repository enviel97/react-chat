import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo } from "react";

interface DirectAvatarProps {
  avatarId: string | undefined;
}

const DirectAvatar: FC<DirectAvatarProps> = ({ avatarId }) => {
  const breakpoint = useBreakpoint();

  return (
    <CircleAvatar
      className='avatar'
      src={avatarId}
      size={breakpoint.up("tablet") ? undefined : 40}
    />
  );
};

export default memo(DirectAvatar);
