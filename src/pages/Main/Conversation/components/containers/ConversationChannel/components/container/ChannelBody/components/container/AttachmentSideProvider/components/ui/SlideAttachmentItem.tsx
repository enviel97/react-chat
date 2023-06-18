import { shaddow } from "@theme/helper/styles";
import { FC, memo, useEffect, useState } from "react";
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
    ${({ $mini, theme }) => {
      if ($mini) {
        return css`
          width: 100%;
        `;
      }
      return css`
        width: fit-content;
        border: 5px solid var(--background-color);
        box-shadow: ${shaddow.boxShadow(
          {
            color: theme.backgroundColor,
            brightness: 20,
            x: -0.2,
            y: -0.2,
            spread: -0.1,
          },
          {
            color: theme.backgroundColor,
            brightness: -50,
            x: 0.2,
            y: 0.2,
            spread: -0.1,
          }
        )};
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
  const [isMini, setMini] = useState(false);

  useEffect(() => {
    setMini(["sm", "md", "s"].includes(viewport));
  }, [viewport]);

  if (attachment.is("DOCS")) return <></>;
  return (
    <PreviewImage
      className={className}
      publicId={attachment.publicId}
      viewport={viewport}
      wrapperClassName='kCN-a1b1c1'
      $mini={isMini}
    />
  );
};

export default memo(SlideAttachmentItem);
