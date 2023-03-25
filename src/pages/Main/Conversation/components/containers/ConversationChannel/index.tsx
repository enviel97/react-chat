import { Event } from "@common/socket.define";
import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchMessages } from "@store/repo/message";
import {
  removeConversation,
  updateConversation,
} from "@store/slices/conversations";
import { selectConversationType } from "@store/slices/ui";
import { isError } from "@utils/validate";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import ChannelSendForm from "./components/container/ChannelSendForm";
import MessageContainerLoading from "./components/ui/MessageContainerLoading";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

const ChannelBody = lazy(() => import("./components/container/ChannelBody"));
const ChannelHeader = lazy(
  () => import("./components/container/ChannelHeader")
);

const NOTICE_YOU_BANNED = "noticeYouBanned";
const modalConfirmBannedOptions = {
  height: "fit-content",
  width: "fit-content",
  isDialog: true,
  showCloseButton: false,
  modalId: NOTICE_YOU_BANNED,
};

const ConversationChannel = () => {
  const { id = "" } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const process = useAppSelector((state) => state.message.process);
  const type = useAppSelector(selectConversationType);
  const socket = useSocket();
  const controller = useModals();

  useEffect(() => {
    const promise = dispatch(fetchMessages({ conversationId: id }));
    return () => {
      promise.abort();
    };
  }, [id, dispatch]);

  const dispatchBannerUser = useCallback(
    (payload: BannedMemberPayload) => {
      if (id === payload.conversationId) {
        dispatch(removeConversation(payload));
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
          modalConfirmBannedOptions
        );
      }
    },
    [dispatch, controller, id, navigator]
  );
  const dispatchConnectedRoom = useCallback((payload: any) => {
    console.log({ payload });
  }, []);

  const dispatchLeavedRoom = useCallback((payload: any) => {
    console.log({ payload });
  }, []);

  const dispatchLeavingGroup = useCallback(
    (payload: Conversation) => {
      dispatch(updateConversation({ conversation: payload, type }));
    },
    [dispatch, type]
  );

  useEffect(() => {
    socket.on(Event.EVENT_BANNED_USER, dispatchBannerUser);
    socket.on(Event.EVENT_CONVERSATION_LEAVE_GROUP, dispatchLeavingGroup);
    socket.on(Event.EVENT_CONNECTED_ROOM, dispatchConnectedRoom);
    socket.on(Event.EVENT_LEAVED_ROOM, dispatchLeavedRoom);
    return () => {
      socket.off(Event.EVENT_CONNECTED_ROOM);
      socket.off(Event.EVENT_LEAVED_ROOM);
      socket.off(Event.EVENT_BANNED_USER);
    };
  }, [
    dispatchBannerUser,
    dispatchConnectedRoom,
    dispatchLeavedRoom,
    dispatchLeavingGroup,
    socket,
  ]);

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

  if (isError(process)) <Navigate to={"/conversation"} replace={true} />;

  return (
    <ChannelContainer>
      <Suspense fallback={"Loading ..."}>
        <ChannelHeader conversationId={id} />
      </Suspense>
      <ChannelBodyContainer>
        <Suspense fallback={<MessageContainerLoading />}>
          <ChannelBody />
        </Suspense>
        <ChannelSendForm conversationId={id} />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;
