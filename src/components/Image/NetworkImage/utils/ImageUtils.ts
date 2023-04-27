import { avatarUrlImage } from "@utils/image";
import { Buffer } from "buffer";

export const createBlobUrl = (
  blob: Blob | MediaSource
): CreateBlobUrlReturn => {
  const url = URL.createObjectURL(blob);
  return {
    url,
    clear: () => URL.revokeObjectURL(url),
  };
};

export const convertBase64ToBlob = (base64: string) => {
  const [info, image] = base64.split(",");
  const mimeType = info.split(":")[1].split(";")[0];

  const buffer = Buffer.from(image, "base64");
  const blob = new Blob([buffer], { type: mimeType });
  return blob;
};

export const convertBlobToBase64 = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        resolve(reader.result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};

export const getImageFromSrc = ({
  src,
  viewPort = "md",
}: GetIdImageFromSrcProps): GetIdImageFromSrcReturn | undefined => {
  if (!src) return;
  /**
   * Default Image
   */
  if (!src.includes("assets")) {
  }

  /**
   * Blob or url image
   */
  if (!src.includes("http")) {
    const url = avatarUrlImage(src);
    return {
      url: viewPort ? url.srcset[viewPort] : url.src,
      key: src,
    };
  }

  /**
   * Avatar or thumnail image
   */
  const srcSlice = src.split("/");
  if (!srcSlice) return;
  const key = srcSlice.at(srcSlice.length - 1)!.split("?")[0];
  return { key, url: src };
};
