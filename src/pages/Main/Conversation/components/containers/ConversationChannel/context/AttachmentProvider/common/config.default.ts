import type { Accept } from "react-dropzone";
export const MAX_FILE_SIZE = 1024 * 1024 * 2; /** 2MB */
export const MAX_FILE_IN_ONE_MESSAGE = 5;
/**
 * Define accept
 */
type AcceptDropZone = { [key in AcceptType]: Accept };
export const ACCEPT: AcceptDropZone = {
  image: { "image/*": [".png", ".jpeg", ".jpg"] },
  document: {
    "application/*": [
      ".pdf",
      ".rtf",
      ".vnd.ms-excel",
      ".vnd.ms-powerpoint",
      ".vnd.ms-project",
      ".vnd.ms-works",
      ".zip",
    ],
  },
  any: { "*": [] },
};
