import { useEffect, useMemo, useState } from "react";
import {
  convertBase64ToBlob,
  convertBlobToBase64,
  getImageFromSrc,
} from "../utils/ImageUtils";
import axios from "axios";
import { createCache, useCache } from "@react-hook/cache";
import { toast } from "react-toastify";
interface Props {
  src?: string;
  viewPort?: ViewPort;
  placeholder: string;
  refresh?: boolean;
}

const blobImage = createCache(async (key: string, url: string) => {
  if (!key) return;
  if (key.includes("default") || url.includes("blob")) return url;
  const response = await axios.get(url, {
    responseType: "blob",
    withCredentials: true,
  });
  if (!response?.data) {
    toast.error("Image loaded error");
    return;
  }
  const image = await convertBlobToBase64(response.data);
  return image as string;
}, 400);

const useProtectImage = ({ src, placeholder, refresh, viewPort }: Props) => {
  const [forceRefresh, setForceRefresh] = useState<boolean>(refresh ?? false);

  const image = useMemo(() => {
    /**
     * Cache placeholder
     */
    const imageUrl = getImageFromSrc({ src, viewPort });
    if (!src || !imageUrl) {
      return { key: "default", url: placeholder };
    }
    return imageUrl;
  }, [src, placeholder, viewPort]);
  const [{ status, value }, refetch] = useCache(
    blobImage,
    image.key,
    image.url
  );
  const [srcImage, setSrcImage] = useState<string>(placeholder);

  useEffect(() => {
    /** Fetch first time */
    if (status === "idle" || forceRefresh) {
      refetch();
      setForceRefresh(false);
    }
  }, [refetch, status, forceRefresh]);

  useEffect(() => {
    if (["idle", "loading"].includes(status)) {
      return;
    }
    if (!value || status === "error" || status === "cancelled") {
      setSrcImage(placeholder);
      return;
    }
    if (status === "success") {
      if (value.includes("assets")) {
        return setSrcImage(placeholder);
      }
      if (value.includes("blob")) {
        setSrcImage(value);
        return;
      }
      const blob = convertBase64ToBlob(value);
      const url = URL.createObjectURL(blob);
      setSrcImage(url);
    }
  }, [value, status, placeholder]);

  return {
    image: srcImage,
    isLoading: status === "idle" || status === "loading",
    isError: status === "error" && !!src,
  };
};

export default useProtectImage;
