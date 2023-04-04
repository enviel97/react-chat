import { ButtonIcon } from "@components/Button";
import { FC } from "react";
import { MdCancel } from "react-icons/md";

interface Props {
  friendId: string;
  friendName: string;
  isLoading?: boolean;
}

const CancelButton: FC<Props> = ({ friendId, friendName, isLoading }) => {
  return (
    <ButtonIcon
      icon={<MdCancel />}
      circle
      color='notification'
      hint='Cancel'
      disabled={!!isLoading}
      hintPosition='left'
    />
  );
};

export default CancelButton;
