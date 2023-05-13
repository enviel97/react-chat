import { NormalImage } from "@components/Image";
import { FC } from "react";

interface AttachmentImageProps {
  imageSrc?: string;
}

const AttachmentImage: FC<AttachmentImageProps> = ({ imageSrc }) => {
  return <NormalImage src={imageSrc} />;
};
export default AttachmentImage;
