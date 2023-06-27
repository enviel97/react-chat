import useWebRTC from "@components/WebRTC/hooks/useWebRTC";
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
  const { call } = useWebRTC();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const handleMessageToFriend = useCallback(async () => {
    const { conversation: response } = await dispatch(
      fetchAddConversation({
        idParticipant: [friendId],
      })
    ).unwrap();
    if (!response.data) return;
    navigator(`/conversation/messenger/${response.data.getId()}`);
  }, [dispatch, navigator, friendId]);

  const handleVideoCall = useCallback(() => {
    call({ id: friendId, type: "VideoCall" });
  }, [friendId]);

  const handlePhoneCall = useCallback(() => {
    call({ id: friendId, type: "PhoneCall" });
  }, [friendId]);

  return (
    <Container>
      <IconClick icon='message' onClick={handleMessageToFriend} />
      <IconClick icon='video_call' onClick={handleVideoCall} />
      <IconClick icon='audio_call' onClick={handlePhoneCall} />
      <IconClick icon='unfriend' onClick={() => {}} />
    </Container>
  );
};

export default FriendActions;
