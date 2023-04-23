import { safeLog } from "@core/api/utils/logger";
import useAppSelector from "@hooks/useAppSelector";
import { selectCacheImage, setCache } from "@store/slices/cache";
import { useCallback, useEffect, useState } from "react";
import { convertBlobToBase64, createBlobUrl } from "../utils/ImageUtils";
import type { CreateBlobUrlReturn } from "../utils/ImageUtils";
import useAppDispatch from "@hooks/useAppDispatch";
import axios from "axios";
interface Props {
  src?: string;
  placeholder: string;
  cache?: boolean;
}

const blobImage = async (imageUrl: string) => {
  return await axios
    .get(imageUrl, { responseType: "blob", withCredentials: true })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};

const useProtectImage = ({ src, placeholder, cache }: Props) => {
  const [isError, setError] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState(src);
  const dispatch = useAppDispatch();

  const getIdFromSrc = useCallback((src: string) => {
    const srcSlice = src?.split("/");
    if (!srcSlice) return;
    return srcSlice.at(srcSlice.length - 1);
  }, []);

  const cachedImage = useAppSelector((state) => {
    if (!src || !cache) return;
    const idName = getIdFromSrc(src);
    if (!idName) return;
    return selectCacheImage(state, idName);
  });

  const loadedImage = useCallback((url: string) => {
    setImage(url);
    setLoading(false);
  }, []);

  useEffect(() => {
    // TODO: get
    let imageBlob: CreateBlobUrlReturn;
    if (cachedImage) {
      imageBlob = createBlobUrl(cachedImage);
      loadedImage(imageBlob.url);
      return;
    }
    if (!src || !src.includes("http")) {
      loadedImage(placeholder);
      return;
    }
    setError(undefined);
    setLoading(true);
    blobImage(src)
      .then(async (blob) => {
        if (!blob || !(blob instanceof Blob) || !blob.type.includes("image")) {
          return Promise.reject("Not image");
        }
        imageBlob = createBlobUrl(blob);
        loadedImage(imageBlob.url);
        if (!cache) return;
        const key = getIdFromSrc(src);
        const data = await convertBlobToBase64(blob);
        dispatch(setCache({ key, value: data }));
      })
      .catch((error) => {
        setError(true);
        safeLog(`Error:::${error}`);
        loadedImage(placeholder);
      });
    return () => {
      !!imageBlob && imageBlob.clear();
    };
  }, [
    src,
    placeholder,
    cachedImage,
    loadedImage,
    dispatch,
    getIdFromSrc,
    cache,
  ]);

  return {
    isError,
    image,
    isLoading,
  };
};

export default useProtectImage;
