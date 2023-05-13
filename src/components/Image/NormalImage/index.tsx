// Brush: https://github.com/ipenywis/img-lazy-loading/tree/master

import local from "@common/local.define";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  NormalImageContainer,
  NormalImageWrapper,
} from "./styles/NormalImage.decorate";
interface NormalImageProps {
  src?: string;
  width?: string;
  height?: string;
}

const NormalImage: FC<NormalImageProps> = ({ width, height, src }) => {
  return (
    <NormalImageContainer>
      <LazyLoadImage
        src={src}
        effect='blur'
        width={width}
        height={height}
        wrapperClassName={`${NormalImageWrapper}`.toClassName()}
        threshold={100}
        placeholderSrc={local.image.PlaceholderImage}
      />
    </NormalImageContainer>
  );
};

export default NormalImage;
