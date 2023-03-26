import { ButtonText } from "@components/Button";
import { FC, memo, useCallback } from "react";
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
  friendId: string;
}

const FriendCard: FC<FriendCardProps> = ({ friendId }) => {
  const friend: UserProfile = {
    user: {
      getFullName: () => `Title`,
    } as any,
    avatar:
      "https://i.ibb.co/vZx5NDS/271656093-2099695566864074-1280132571646855750-n.jpg",
  };

  const bio = `Nothing to say...`;
  const _onConfirm = useCallback(() => {}, []);
  const _onReject = useCallback(() => {}, []);

  return (
    <CardContainer>
      <CardHeader>
        <img src={friend.avatar} alt='be-iu-img' loading='lazy' />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{friend.user.getFullName()}</CardTitle>
          <CardBio>&ldquo;{bio}&rdquo;</CardBio>
        </CardContent>
        <CardAction>
          <ButtonText text={"Add"} height='fit-content' onClick={_onConfirm} />
          <ButtonText
            text={"Reject"}
            color={"notification"}
            height='fit-content'
            onClick={_onReject}
          />
        </CardAction>
      </CardBody>
    </CardContainer>
  );
};

export default memo(FriendCard);
