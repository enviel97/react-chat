import local from "@common/local.define";
import { FC, memo, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { motion } from "framer-motion";
import UploadImageButton from "../../../../ui/UploadImageButton";
interface Props {
  src?: string;
}

const ThumbnailContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-image: linear-gradient(black, transparent);
  }
`;

const Thumbnail: FC<Props> = ({ src = local.image.backgroundDefault }) => {
  const [imageUrl, setImageUrl] = useState(src);

  return (
    <ThumbnailContainer>
      <UploadImageButton />
      <img
        src={imageUrl}
        alt={"Thumbnail"}
        loading='lazy'
        onLoad={() => {}}
        onError={() => {
          setImageUrl(local.image.backgroundDefault);
          toast.error("Load thumbnail error !!");
        }}
      />
    </ThumbnailContainer>
  );
};

export default memo(Thumbnail);
