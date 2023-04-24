import local from "@common/local.define";
import { FC, memo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UploadImageButton from "../../../../ui/UploadImageButton";
import NetworkImage from "@components/Image/NetworkImage";
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
  aspect-ratio: 16 / 9;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-image: linear-gradient(black, transparent);
  }
`;

const Thumbnail: FC<Props> = ({ src = local.image.backgroundDefault }) => {
  const [imageUrl] = useState(src);

  return (
    <ThumbnailContainer>
      <UploadImageButton type='banner' />
      <NetworkImage
        src={imageUrl}
        alt={"Thumbnail"}
        placeholder={local.image.backgroundDefault}
      />
    </ThumbnailContainer>
  );
};

export default memo(Thumbnail);
