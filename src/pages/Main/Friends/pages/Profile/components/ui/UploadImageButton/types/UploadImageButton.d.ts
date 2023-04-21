type UploadImageType = "avatar" | "banner";
interface UploadImageButtonProps {
  separateSpace?: string;
  size?: string;
  type?: UploadImageType;
  onUploadSuccess?: (blobString: string) => void;
  onUploadError?: (error?: any) => void;
}
