import local from "@common/local.define";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ControllerLazyLoadImage,
  PlaceholderContainer,
  RandomName,
} from "./styles/NetworkImage.decorate";

const NetworkImage: FC<NetworkImageProps> = ({
  src,
  alt,
  width,
  height,
  wrapperClassName,
  placeholder = local.image.UnknownAvatar,
}) => {
  const [isError, setError] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [img, setImg] = useState(src ?? placeholder);

  const Placeholder = useMemo(
    () => (
      <PlaceholderContainer
        alt='Placeholder'
        src={placeholder}
        $isLoading={isLoading}
        $isError={isError}
      />
    ),
    [placeholder, isLoading, isError]
  );

  useEffect(() => {
    if (isError) {
      setImg(placeholder);
    }
  }, [isError, placeholder]);

  return (
    <ControllerLazyLoadImage>
      <LazyLoadImage
        alt={alt}
        src={img}
        height={height}
        width={width}
        effect='opacity'
        delayTime={1000}
        placeholder={Placeholder}
        visibleByDefault={img === placeholder}
        wrapperClassName={string.classList(
          RandomName.toString().toClassName(),
          wrapperClassName
        )}
        loading={"lazy"}
        afterLoad={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </ControllerLazyLoadImage>
  );
};

export default memo(NetworkImage);
