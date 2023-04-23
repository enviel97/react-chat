import { createSelector } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import cacheAdapter from "../adapter/cacheAdapter";
import { Buffer } from "buffer";

const { selectById: selectCacheByKey } = cacheAdapter.getSelectors(
  (state: RootState) => state[SliceName.cache]
);

const selectCacheImage = createSelector([selectCacheByKey], (cache) => {
  if (!cache || !cache.value) return;
  // console.log({ cache });
  const dataURI = cache.value;
  const buffer = Buffer.from(dataURI.split(",")[1], "base64");
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const imageBlobPart = new Uint8Array(buffer);
  const bb = new Blob([imageBlobPart], { type: mimeString });
  return bb;
});

export default selectCacheImage;
