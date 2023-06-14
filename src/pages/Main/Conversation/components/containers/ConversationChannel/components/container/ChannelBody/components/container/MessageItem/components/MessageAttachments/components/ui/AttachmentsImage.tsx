import { NormalImage } from "@components/Image";
import { imageUrl } from "@utils/image";
import { FC, memo, useEffect, useState } from "react";

const AttachmentsImage: FC<AttachmentsImageProps> = ({
  publicId,
  className,
  viewport = "sm",
  wrapperClassName,
}) => {
  const [src, setSrc] = useState<string>();
  const [placeHolder, setPlaceholder] = useState<string>();

  useEffect(() => {
    if (publicId.includes("http")) {
      setSrc(publicId);
      setPlaceholder(publicId);
    } else {
      setSrc(imageUrl.normal(publicId, viewport));
      setPlaceholder(imageUrl.normal(publicId, "s"));
    }
  }, [publicId, viewport]);

  return (
    <NormalImage
      className={className}
      threshold={200}
      src={src}
      wrapperInjection={wrapperClassName}
      placeholderSrc={placeHolder}
    />
  );
};

export default memo(AttachmentsImage);
