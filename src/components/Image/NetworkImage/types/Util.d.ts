/**
 * Image create
 */

type ViewPort = "xl" | "lg" | "md" | "sm" | "s";

interface GetIdImageFromSrcReturn {
  url: string;
  key: string;
}

interface GetIdImageFromSrcProps {
  viewPort?: ViewPort;
  src?: string;
}

/**
 * Blob create
 */
type CreateBlobUrlReturn = { url: string; clear: () => void };
