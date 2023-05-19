import { toast } from "react-toastify";

interface ValidateFileInputRule {
  maxSize?: number;
}

export const fileInputFilter = (
  file?: File,
  { maxSize }: ValidateFileInputRule = {}
) => {
  if (!file) {
    toast.error("File not found");
    return;
  }
  if (maxSize && file.size > maxSize) {
    toast.error(`File exceeds limit: ${maxSize.toNormalSize()}`);
    return;
  }
  return file;
};
