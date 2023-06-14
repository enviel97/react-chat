import SkeletonContainer from "@components/Skeleton";
import { FC, memo, ReactEventHandler } from "react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";
import useProtectImage from "./hook/useProtectImage";

import {
  ControllerLazyLoadImage,
  ImageContainer,
} from "./styles/CacheImage.decorate";

const CacheImage: FC<CacheImageProps> = ({
  className,
  src,
  placeholder,
  onLoadedError,
  onLoadedSuccess,
  alt = "",
  width = "100%",
  height = "100%",
  refresh = false,
  preventAutoRevoke = false,
  viewPort = "sm",
  type = "normal",
}) => {
  const theme = useTheme();

  const { image, isLoading, isError } = useProtectImage({
    src,
    placeholder,
    refresh,
    viewPort,
    type,
  });

  const handleOnLoaded: ReactEventHandler<HTMLImageElement> = (event) => {
    // Onload revoke blob
    if (isError) {
      onLoadedError && onLoadedError(event);
      return;
    }
    if (!isLoading && !isError) {
      onLoadedSuccess && onLoadedSuccess(event);
      if (!!preventAutoRevoke) return;
      const currentSrc = event.currentTarget.currentSrc;
      if (currentSrc.includes("blob")) {
        URL.revokeObjectURL(currentSrc);
      }
    }
  };

  return (
    <SkeletonContainer
      height={height}
      width={width}
      baseColor={theme.backgroundColor}
      highlightColor={theme.surfaceColor}
    >
      <ControllerLazyLoadImage className={className}>
        {isLoading && <Skeleton height={height} width={width} />}
        {!isLoading && (
          <ImageContainer
            src={image}
            height={height}
            width={width}
            alt={alt}
            loading={"lazy"}
            onLoad={handleOnLoaded}
            $isPlaceholder={image === placeholder}
          />
        )}
      </ControllerLazyLoadImage>
    </SkeletonContainer>
  );
};

export default memo(CacheImage);
