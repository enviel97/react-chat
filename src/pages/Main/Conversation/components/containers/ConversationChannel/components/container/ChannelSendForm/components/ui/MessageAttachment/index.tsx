import { FC, memo } from "react";
import AttachmentContainer from "./components/container/AttachmentContainer";
import AttachmentButton from "./components/ui/AttachmentButton";
import AttachmentProvider from "./reducer/attachment.provider";
import {
  MessageAttachmentContainer,
  AttachmentTrigger,
} from "./styles/MessageAttachment.decorate";

interface MessageAttachmentProps extends Components {}

const MessageAttachment: FC<MessageAttachmentProps> = ({ children }) => {
  return (
    <AttachmentProvider>
      <MessageAttachmentContainer>
        <AttachmentContainer />
        <AttachmentTrigger>
          <AttachmentButton />
          {children}
        </AttachmentTrigger>
      </MessageAttachmentContainer>
    </AttachmentProvider>
  );
};

export default memo(MessageAttachment);
