import useCall from "@components/WebRTC/hooks/useCall";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchAddConversation } from "@store/repo/conversation";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconClick from "../ui/IconClick";

interface FriendAction {
  friendId: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 0.5em;
`;

const FriendActions: FC<FriendAction> = ({ friendId }) => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { trigger: call } = useCall(friendId);

  const handleMessageToFriend = useCallback(async () => {
    const { conversation: response } = await dispatch(
      fetchAddConversation({
        idParticipant: [friendId],
      })
    ).unwrap();
    if (!response.data) return;
    navigator(`/conversation/messenger/${response.data.getId()}`);
  }, [dispatch, navigator, friendId]);

  const handleCall = useCallback(async () => {
    await call();
  }, [call]);

  return (
    <Container>
      <IconClick icon='message' onClick={handleMessageToFriend} />
      <IconClick icon='video_call' onClick={handleCall} />
      <IconClick icon='unfriend' onClick={() => {}} />
    </Container>
  );
};

export default FriendActions;
