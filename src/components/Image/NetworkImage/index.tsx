import local from "@common/local.define";
import string from "@utils/string";
import { FC, memo, ReactEventHandler, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SwapSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";
import {
  ControllerLazyLoadImage,
  AbsoluteContainer,
  PlaceholderContainer,
  RandomName,
} from "./styles/NetworkImage.decorate";

const PlaceHolder: FC<NetworkLoading> = ({ isLoading, isError }) => {
  return (
    <PlaceholderContainer
      alt='Placeholder'
      src={local.image.UnknownAvatar}
      $isLoading={isLoading}
      $isError={isError}
    />
  );
};

const NetworkImage: FC<NetworkImageProps> = ({
  src,
  srcset,
  sizes,
  alt,
  width,
  height,
  wrapperClassName,
  placeholder = local.image.UnknownAvatar,
  showLoading,
}) => {
  const [isError, setError] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [img, setImg] = useState(src ?? placeholder);
  const theme = useTheme();

  const handleOnError: ReactEventHandler<HTMLImageElement> = ({
    currentTarget,
  }) => {
    currentTarget.onerror = null;
    currentTarget.src = placeholder;
    setError(true);
    setLoading(false);
  };

  const handleOnLoad: ReactEventHandler<HTMLImageElement> = ({
    currentTarget,
  }) => {
    setImg(currentTarget.currentSrc);
    setLoading(false);
  };

  return (
    <ControllerLazyLoadImage>
      <LazyLoadImage
        alt={alt}
        src={img}
        sizes={sizes}
        srcSet={srcset}
        effect='opacity'
        height={height}
        width={width}
        placeholder={<PlaceHolder isLoading={isLoading} isError={isError} />}
        visibleByDefault={img === placeholder}
        delayMethod={"debounce"}
        delayTime={500}
        wrapperClassName={string.classList(
          `${RandomName}`.toClassName(),
          wrapperClassName
        )}
        loading={"lazy"}
        onLoad={handleOnLoad}
        onError={handleOnError}
      />

      {showLoading && isLoading && (
        <AbsoluteContainer>
          <SwapSpinner color={theme.disableColor} size={28} />
        </AbsoluteContainer>
      )}
    </ControllerLazyLoadImage>
  );
};

export default memo(NetworkImage);
