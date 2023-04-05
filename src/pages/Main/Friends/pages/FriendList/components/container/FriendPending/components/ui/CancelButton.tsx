import { ButtonIcon } from "@components/Button";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchFriendRequestCancel } from "@store/repo/user";
import { FC, useState } from "react";
import { MdCancel } from "react-icons/md";

interface Props {
  friendId: string;
  friendName: string;
  isLoading?: boolean;
}

const CancelButton: FC<Props> = ({ friendId, friendName, isLoading }) => {
  const dispatch = useAppDispatch();
  const [isPending, setPending] = useState(false);

  const handleCancelPendingRequest = () => {
    PromiseToast({
      action() {
        setPending(true);
        return dispatch(fetchFriendRequestCancel(friendId)).unwrap();
      },
      onSuccess: () => {},
      onFinally: () => setPending(false),
    });
  };

  return (
    <ButtonIcon
      icon={<MdCancel />}
      circle
      color='notification'
      hint='Cancel'
      disabled={!!isLoading || isPending}
      hintPosition='left'
      onClick={handleCancelPendingRequest}
    />
  );
};

export default CancelButton;
