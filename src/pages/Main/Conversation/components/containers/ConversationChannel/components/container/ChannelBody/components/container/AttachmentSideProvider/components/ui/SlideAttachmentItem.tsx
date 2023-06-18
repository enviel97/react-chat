import { FC, memo } from "react";
import styled, { css } from "styled-components";
import AttachmentsImage from "../../../MessageItem/components/MessageAttachments/components/ui/AttachmentsImage";

interface SlideAttachmentItemProps {
  attachment: MessageAttachments;
  viewport?: ViewPort;
  className?: string;
}
interface PreviewImageStyles {
  $mini: boolean;
}

const PreviewImage = styled(AttachmentsImage)<PreviewImageStyles>`
  /* background-color: ${({ theme }) => theme.backgroundColor}; */
  background-color: transparent;
  height: 100%;
  width: 100%;

  & .kCN-a1b1c1 {
    height: 100%;
    ${({ $mini }) => {
      if ($mini) {
        return css`
          width: 100%;
        `;
      }
      return css`
        width: fit-content;
      `;
    }}
  }
  & img {
    height: 100%;
    width: 100%;
    ${({ $mini }) => {
      if ($mini) {
        return css`
          object-position: center;
          object-fit: cover;
        `;
      }
      return css`
        object-fit: contain;
      `;
    }}
  }
`;

const SlideAttachmentItem: FC<SlideAttachmentItemProps> = ({
  attachment,
  viewport = "md",
  className,
}) => {
  if (attachment.is("DOCS")) return <></>;
  return (
    <PreviewImage
      className={className}
      publicId={attachment.publicId}
      viewport={viewport}
      wrapperClassName='kCN-a1b1c1'
      $mini={["sm", "md", "s"].includes(viewport)}
    />
  );
};

export default memo(SlideAttachmentItem);
