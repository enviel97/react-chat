import { imageUrl } from "@utils/image";
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
  type = "normal",
}: GetIdImageFromSrcProps) => {
  /**
   * Blob or url image
   */
  if (!src.includes("http")) {
    const url = imageUrl[type](src, viewPort);
    return { url: url, key: src };
  }

  /**
   * Avatar or thumbnail image
   */
  const srcSlice = src.split("/");
  const key = srcSlice.at(-1)!;
  return { key, url: src };
};
