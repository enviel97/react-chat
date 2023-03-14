import { Event } from "@common/socket.define";
import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchMessages } from "@store/repo/message";
import { removeConversation } from "@store/slices/conversations";
import { isError } from "@utils/validate";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChannelBody from "./components/container/ChannelBody";
import ChannelHeader from "./components/container/ChannelHeader";
import ChannelSendForm from "./components/container/ChannelSendForm";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

const NOTICE_YOU_BANNED = "noticeYouBanned";

const ConversationChannel = () => {
  const { id = "" } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const process = useAppSelector((state) => state.message.process);
  const socket = useSocket();
  const controller = useModals();

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  const dispatchBannerUser = useCallback(
    (payload: BannedMemberPayload) => {
      if (id === payload.conversationId) {
        controller.show(
          <ModalConfirm
            content={"You has been banned"}
            modalKey={NOTICE_YOU_BANNED}
            onConfirm={() => {
              navigator("/conversation");
              controller.close(NOTICE_YOU_BANNED);
            }}
            justConfirm
          />,
          {
            height: "fit-content",
            width: "fit-content",
            isDialog: true,
            showCloseButton: false,
          }
        );
        dispatch(removeConversation(payload));
      }
    },
    [dispatch, controller, id, navigator]
  );
  const dispatchConnectedRoom = (payload: any) => {
    console.log({ payload });
  };

  const dispatchLeavedRoom = (payload: any) => {
    console.log({ payload });
  };

  useEffect(() => {
    socket.on(Event.EVENT_BANNED_USER, dispatchBannerUser);
    socket.on(Event.EVENT_CONNECTED_ROOM, dispatchConnectedRoom);
    socket.on(Event.EVENT_LEAVED_ROOM, dispatchLeavedRoom);
    return () => {
      socket.off(Event.EVENT_CONNECTED_ROOM);
      socket.off(Event.EVENT_LEAVED_ROOM);
      socket.off(Event.EVENT_BANNED_USER);
    };
  }, [dispatchBannerUser, socket]);

  useLayoutEffect(() => {
    /**
     * Connect to conversation before render UI
     */
    socket.emit(Event.EVENT_CONNECT_ROOM_CONVERSATION, {
      conversationId: id,
    });
    return () => {
      socket.emit(Event.EVENT_LEAVE_ROOM_CONVERSATION, { conversationId: id });
    };
  }, [id, socket]);

  if (isError(process)) navigator("/conversation");

  return (
    <ChannelContainer>
      <ChannelHeader conversationId={id} />
      <ChannelBodyContainer>
        <ChannelBody />
        <ChannelSendForm conversationId={id} />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;
