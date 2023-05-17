import client from "@core/api";
import { PROFILE_UPLOAD_IMAGE } from "@store/common/repo";
import type { AxiosProgressEvent } from "axios";

interface FormData {
  file: Blob;
  pathVariable: "avatar" | "banner";
}
const uploadImage = async (
  { file, pathVariable }: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append("image", file);
  return await client.patch<any, Response<UserProfile>>(
    PROFILE_UPLOAD_IMAGE,
    formData,
    {
      timeout: 10 * 1000,
      headers: { "Content-Type": "multipart/form-data" },
      pathVariable: { type: pathVariable },
      onUploadProgress,
      onDownloadProgress,
    }
  );
};

export default uploadImage;
