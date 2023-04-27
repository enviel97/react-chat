import local from "@common/local.define";
import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UploadImageButton from "../../../../ui/UploadImageButton";
import NetworkImage from "@components/Image/NetworkImage";
import { bannerUrlImage } from "@utils/image";
interface Props {
  thumbnailSrc?: string;
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

const Thumbnail: FC<Props> = ({ thumbnailSrc }) => {
  const [banner, setBanner] = useState<string | undefined>(thumbnailSrc);
  useEffect(() => {
    if (!thumbnailSrc || thumbnailSrc.includes("http")) return;
    const banner = bannerUrlImage(thumbnailSrc);
    setBanner(banner.src);
  }, [thumbnailSrc]);

  return (
    <ThumbnailContainer>
      <UploadImageButton type='banner' />
      <NetworkImage
        src={banner}
        alt={"Thumbnail"}
        placeholder={local.image.backgroundDefault}
        viewPort={"md"}
      />
    </ThumbnailContainer>
  );
};

export default memo(Thumbnail);
