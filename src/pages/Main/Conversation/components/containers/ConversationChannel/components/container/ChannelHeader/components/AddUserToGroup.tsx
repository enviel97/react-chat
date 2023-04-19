import { ButtonIconNeumorphism } from "@components/Button";
import useAuthenticate from "@hooks/useAuthenticate";
import useAddMember from "@pages/Main/Conversation/hooks/useAddMember";
import string from "@utils/string";
import { FC, useMemo } from "react";
import { TiUserAdd } from "react-icons/ti";

interface AddUserToGroupProps {
  conversationId: string;
  type: ConversationType;
  role?: ParticipantRole;
  members: User[];
}

const AddUserToGroup: FC<AddUserToGroupProps> = ({
  conversationId,
  role,
  members,
  type,
}) => {
  const { user } = useAuthenticate();
  const onAddUserHandler = useAddMember(conversationId, members);

  const canInvite = useMemo(() => {
    const _role = role && role[string.getId(user)];
    return _role === "Admin" && type === "group";
  }, [role, user, type]);

  if (!canInvite) return <></>;

  return (
    <ButtonIconNeumorphism
      size='2.5em'
      icon={<TiUserAdd size={"2.5em"} />}
      onClick={onAddUserHandler}
      hint='Invite new members'
    />
  );
};

export default AddUserToGroup;
