import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo, useEffect, useMemo, useState } from "react";
import {
  AvatarContainer,
  AvatarCount,
  GroupAvatarContainer,
} from "../styles/GroupAvatar.decorate";

type Srcset = string | undefined;
interface GroupAvatarProps {
  avatarIds: Srcset[];
}

const GroupAvatar: FC<GroupAvatarProps> = ({ avatarIds }) => {
  const breakpoint = useBreakpoint();

  const [src, setSrc] = useState<Srcset[]>([]);
  const size = useMemo(() => {
    return breakpoint.up("tablet") ? 36 : 40;
  }, [breakpoint]);
  useEffect(() => {
    if (avatarIds.length > 3) {
      setSrc(avatarIds.slice(0, 3));
    } else {
      setSrc(avatarIds);
    }
  }, [avatarIds]);

  return (
    <GroupAvatarContainer $size={size.toEm()}>
      {src.map((avatarId, index) => {
        return (
          <AvatarContainer key={`${index}`} $identity={index}>
            <CircleAvatar
              className='avatar'
              src={avatarId}
              size={(size * 2) / 3}
            />
          </AvatarContainer>
        );
      })}
      {avatarIds.length - 3 !== 0 && <AvatarCount>···</AvatarCount>}
    </GroupAvatarContainer>
  );
};

export default memo(GroupAvatar);
