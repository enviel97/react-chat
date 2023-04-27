import { convertBase64ToBlob } from "@components/Image/NetworkImage/utils/ImageUtils";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectImage = createSelector(
  [(state: RootState) => state.profile, (_, type: "avatar" | "banner") => type],
  (profileState, type) => {
    const image = profileState.profile[type];

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
