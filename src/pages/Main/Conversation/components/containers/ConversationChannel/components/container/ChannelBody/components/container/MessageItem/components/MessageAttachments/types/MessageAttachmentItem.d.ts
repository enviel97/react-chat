interface AttachmentInfoProps {
  type: string;
  size?: number;
  originalName?: string;
  createdAt?: string;
}

interface AttachmentInfoRowProps {
  title: string;
  content?: string | number;
}

interface MessageAttachmentItemProp {
  attachment: MessageAttachments;
  onItemClick: () => void;
}

interface ImageAttachmentsProp {
  publicId: string;
  type: string;
  size?: number;
  originalName?: string;
  createdAt?: string;
}
