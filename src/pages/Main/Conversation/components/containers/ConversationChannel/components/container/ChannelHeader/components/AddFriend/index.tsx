import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import FriendIcon from "./components/FriendIcon";
import Hint from "./components/Hint";
import useAddFriend from "./hooks/useAddFriends";
import { AddFriendContainer } from "./styles/AddFriend.decorate";

interface AddFriendProps {
  friendId?: string;
}

const AddFriend: FC<AddFriendProps> = ({ friendId }) => {
  const { loadState, relationship, trigger } = useAddFriend(friendId);
  const navigate = useNavigate();

  const onActionClick = () => {
    switch (relationship) {
      case "pending": {
        navigate("/friends/request");
        break;
      }
      case "guest": {
        trigger();
        break;
      }
    }
  };

  return (
    <AddFriendContainer
      id='FriendAction'
      $loadState={loadState}
      $relationship={relationship}
      onClick={onActionClick}
    >
      <FriendIcon relationship={relationship} loadState={loadState} />
      <Hint relationship={relationship} />
    </AddFriendContainer>
  );
};

export default memo(AddFriend);
