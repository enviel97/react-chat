import { convertBase64ToBlob } from "@components/Image/CacheImage/utils/ImageUtils";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectImage = createSelector(
  [(state: RootState) => state.profile, (_, type: "avatar" | "banner") => type],
  (profileState, type) => {
    const profile = profileState.user?.profile ?? profileState.profile;
    const image = type === "avatar" ? profile?.avatar : profile?.banner;
    if (!image) return;
    if (image.includes("base64")) {
      const blob = convertBase64ToBlob(image);
      const url = URL.createObjectURL(blob);
      return url;
    }
    return image;
  }
);

export default selectImage;
