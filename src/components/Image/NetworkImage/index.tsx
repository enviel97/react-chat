import local from "@common/local.define";
import { FC, memo, ReactEventHandler } from "react";
import useProtectImage from "./hook/useProtectImage";
import {
  ControllerLazyLoadImage,
  ImageContainer,
} from "./styles/NetworkImage.decorate";

const NetworkImage: FC<NetworkImageProps> = ({
  src,
  srcset,
  sizes,
  alt = "",
  width,
  height,
  placeholder = local.image.UnknownAvatar,
  cache,
}) => {
  const { image, isLoading, isError } = useProtectImage({
    src,
    placeholder,
    cache,
  });
  const _revokeImage: ReactEventHandler<HTMLImageElement> = (event) => {
    // Onload revoke blob
    const currentSrc = event.currentTarget.currentSrc;
    if (currentSrc.includes("blob")) {
      URL.revokeObjectURL(currentSrc);
    }
  };
  return (
    <ControllerLazyLoadImage>
      <ImageContainer
        src={image}
        sizes={sizes}
        srcSet={srcset}
        height={height}
        width={width}
        alt={alt}
        loading={"lazy"}
        onLoad={_revokeImage}
        $isError={isError}
        $isLoading={isLoading}
        $isPlaceholder={image === local.image.UnknownAvatar}
      />
    </ControllerLazyLoadImage>
  );
};

export default memo(NetworkImage);
