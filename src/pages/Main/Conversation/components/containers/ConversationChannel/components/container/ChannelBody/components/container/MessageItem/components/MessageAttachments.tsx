import { NetworkImage } from "@components/Image";
import { FC, memo } from "react";
import styled from "styled-components";
import local from "@common/local.define";
import useThemeMode from "@hooks/useThemeMode";

interface MessageAttachmentsProps {
  attachments: MessageAttachments[];
}

const AttachmentsContainer = styled.div`
  position: relative;
  border-radius: inherit;
  padding: 0.5em;
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: flex-start;
`;

const AttachmentsItem = styled.div<{ $quantity: number }>`
  width: 12.5em;
  aspect-ratio: 3/4;
  padding: 0.15em;
`;

const MessageAttachments: FC<MessageAttachmentsProps> = ({ attachments }) => {
  const { isDark } = useThemeMode();
  if (attachments.length === 0) {
    return <></>;
  }
  return (
    <AttachmentsContainer>
      {attachments.map((attachment) => {
        return (
          <AttachmentsItem
            key={attachment.getId()}
            $quantity={attachments.length}
          >
            <NetworkImage
              src={attachment.publicId}
              placeholder={local.image.EmptyImage[isDark ? "dark" : "light"]}
              preventAutoRevoke
            />
          </AttachmentsItem>
        );
      })}
    </AttachmentsContainer>
  );
};

export default memo(MessageAttachments);
