type ViewPort = "xl" | "lg" | "md" | "sm" | "s";
type ImageType = "avatar" | "normal" | "banner";

interface GetIdImageFromSrcReturn {
  url: string;
  key: string;
}

interface GetIdImageFromSrcProps {
  viewPort?: ViewPort;
  src: string;
  type?: ImageType;
}

/**
 * Blob create
 */
type CreateBlobUrlReturn = { url: string; clear: () => void };
