import { safeLog } from "@core/api/utils/logger";
import { useEffect, useState } from "react";

interface Props {
  src?: string;
  placeholder: string;
}

const blobImage = async (imageUrl: string) => {
  return await fetch(imageUrl)
    .then((res) => res?.blob())
    .catch((err) => Promise.reject(err));
};

const useProtectImage = ({ src, placeholder }: Props) => {
  const [isError, setError] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState(src);

  useEffect(() => {
    if (!src || !src.includes("http")) {
      setLoading(false);
      setImage(placeholder);
      return;
    }
    let imageBlob: string;
    setLoading(true);
    blobImage(src)
      .then((blob) => {
        setLoading(false);
        if (!blob || !blob.type?.includes("image")) {
          return Promise.reject("Not image");
        }
        imageBlob = URL.createObjectURL(blob);
        setImage(imageBlob);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        safeLog(`Error:::${error}`);
        setImage(placeholder);
      });
    return () => {
      !!imageBlob && URL.revokeObjectURL(imageBlob);
    };
  }, [src, placeholder]);

  return {
    isError,
    image,
    isLoading,
  };
};

export default useProtectImage;
