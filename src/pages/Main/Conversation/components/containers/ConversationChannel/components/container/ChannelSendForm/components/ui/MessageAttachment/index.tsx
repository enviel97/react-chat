import { FC, memo } from "react";
import AttachmentContainer from "./components/container/AttachmentContainer";
import AttachmentButton from "./components/ui/AttachmentButton";
import {
  MessageAttachmentContainer,
  AttachmentTrigger,
} from "./styles/MessageAttachment.decorate";

interface MessageAttachmentProps extends Components {}

const MessageAttachment: FC<MessageAttachmentProps> = ({ children }) => {
  return (
    <MessageAttachmentContainer>
      <AttachmentContainer />
      <AttachmentTrigger>
        <AttachmentButton />
        {children}
      </AttachmentTrigger>
    </MessageAttachmentContainer>
  );
};

export default memo(MessageAttachment);
