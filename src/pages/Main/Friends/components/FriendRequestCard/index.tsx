import local from "@common/local.define";
import { CacheImage } from "@components/Image";
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
  friend: { user, bio, avatar },
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
        <CacheImage
          placeholder={local.image.UnknownAvatar}
          src={avatar}
          type='avatar'
          alt='image'
        />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>
            {user
              .getFullName()
              .concat(
                user.profile?.displayName
                  ? ` (${user.profile?.displayName})`
                  : ""
              )}
          </CardTitle>
          <CardBio>&ldquo;{bio || "Nothing to say"}&rdquo;</CardBio>
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
