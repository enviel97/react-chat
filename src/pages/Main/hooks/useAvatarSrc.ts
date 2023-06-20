import { imageUrl } from "@utils/image";
import { useEffect, useState } from "react";

const useAvatarSrc = (src?: string) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  useEffect(() => {
    if (!src || src.includes("http")) {
      setImageSrc(src);
    } else {
      const image = imageUrl.avatar(src, "s");
      setImageSrc(image);
    }
  }, [src]);

  return {
    avatar: imageSrc,
    setImageSrc: setImageSrc,
  };
};

export default useAvatarSrc;
