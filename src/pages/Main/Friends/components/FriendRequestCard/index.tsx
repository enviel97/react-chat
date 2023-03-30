import NetworkImage from "@components/Image/NetworkImage";
import { FC, memo, useCallback } from "react";
import ActionButton from "./components/ActionButton";
import {
  CardAction,
  CardBio,
  CardBody,
  CardContainer,
  CardContent,
  CardHeader,
  CardTitle,
} from "./styles/Card.decorate";

interface FriendCardProps {
  loading?: boolean;
  friend: UserProfile;
  isShowRejectButton?: boolean;
  onClickAdd?: () => void;
  onClickReject?: () => void;
}

const FriendCard: FC<FriendCardProps> = ({
  friend: { user, bio = "Nothing to say", avatar },
  isShowRejectButton = true,
  onClickAdd,
  onClickReject,
  loading,
}) => {
  const _onConfirm = useCallback(() => {
    onClickAdd && onClickAdd();
  }, [onClickAdd]);

  const _onReject = useCallback(() => {
    onClickReject && onClickReject();
  }, [onClickReject]);

  return (
    <CardContainer>
      <CardHeader>
        <NetworkImage src={avatar} alt='image' />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{user.getFullName()}</CardTitle>
          <CardBio>&ldquo;{bio}&rdquo;</CardBio>
        </CardContent>
        <CardAction>
          <ActionButton
            key={"AddAction"}
            text={"Add"}
            onClick={_onConfirm}
            loading={loading}
          />
          {isShowRejectButton && (
            <ActionButton
              key={"RejectAction"}
              text={"Reject"}
              color={"notification"}
              onClick={_onReject}
              loading={loading}
            />
          )}
        </CardAction>
      </CardBody>
    </CardContainer>
  );
};

export default memo(FriendCard);
