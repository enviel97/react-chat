import { avatarUrlImage } from "@utils/image";
import { useEffect, useState } from "react";

const useAvatarSrc = (src?: string) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  useEffect(() => {
    if (!src) return;
    if (src.includes("http")) {
      setImageSrc(src);
    } else {
      const image = avatarUrlImage(src);
      setImageSrc(image.src);
    }
  }, [src]);

  return {
    avatar: imageSrc,
    setImageSrc: setImageSrc,
  };
};

export default useAvatarSrc;
