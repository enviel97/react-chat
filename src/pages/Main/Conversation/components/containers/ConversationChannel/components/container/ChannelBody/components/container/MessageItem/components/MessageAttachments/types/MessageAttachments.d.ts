interface MessageAttachmentsProps {
  attachments: MessageAttachments[];
}

interface MessageAttachmentSlideProps {
  attachments: MessageAttachments[];
  defaultSelect?: number;
}

interface AttachmentsImageProps {
  publicId: string;
  className?: string;
  wrapperClassName?: string;

  /**
   * Viewport: Custom size of image when get image from services
   * @param "xl" | "lg" | "md" | "sm" | "s" - once of
   */
  viewport?: ViewPort;
}
