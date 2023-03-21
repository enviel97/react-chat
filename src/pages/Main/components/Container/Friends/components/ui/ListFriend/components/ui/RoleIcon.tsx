import { FC, useMemo } from "react";
import { IconType } from "react-icons";
import { MdKey, MdPerson } from "react-icons/md";
import { ListItemHint } from "../../styles/ListFriend.decorate";

interface RoleIconProps {
  role?: Role;
  id: string;
}

const RoleIcon: FC<RoleIconProps> = ({ role, id }) => {
  const Icons = useMemo(() => {
    return new Map<Role, IconType>([
      ["Admin", MdKey],
      ["Member", MdPerson],
    ]);
  }, []);

  const Icon = Icons.get(role ?? "Member");

  if (!role || !Icon) return <></>;
  return (
    <>
      <Icon size={28} id={`role-${id}`} tabIndex={-1} />
      <ListItemHint
        id='tooltip'
        anchorId={`role-${id}`}
        content={role}
        place={"top"}
        delayShow={100}
      />
    </>
  );
};

export default RoleIcon;
