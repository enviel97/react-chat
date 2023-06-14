interface OpenSlideProps {
  attachments: MessageAttachments[];
  defaultIndex: number;
}

interface AttachmentSlideController {
  closeSlide: () => void;
  openSlide: (params: OpenSlideProps) => void;
}
