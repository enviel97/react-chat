import client from "@core/api";
import { PROFILE_UPLOAD_IMAGE } from "@store/common/repo";
import type { AxiosProgressEvent } from "axios";

interface FormData {
  file: Blob;
  pathVariable: "avatar" | "banner";
}
export const uploadImage = async (
  { file, pathVariable }: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return await client.patch<any, Response<UserProfile>>(
    PROFILE_UPLOAD_IMAGE,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      pathVariable: { type: pathVariable },
      onUploadProgress,
    }
  );
};
