import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import {
  ClearAction,
  UpdateAction,
  SetAction,
  DeleteAction,
  DeleteManyAction,
} from "./actions";
import type { CacheState } from "../state/cache";
import cacheAdapter from "./adapter/cacheAdapter";
import type { RootState } from "@store/index";

export const cacheSlice = createSlice({
  name: SliceName.cache,
  initialState: cacheAdapter.getInitialState() as CacheState,
  reducers: {
    setCache: SetAction,
    updateCache: UpdateAction,
    clearCache: ClearAction,
    deleteCache: DeleteAction,
    deleteMultiCache: DeleteManyAction,
  },
});

export const {
  setCache,
  updateCache,
  clearCache,
  deleteCache,
  deleteMultiCache,
} = cacheSlice.actions;

export const { selectById: selectCacheByKey } = cacheAdapter.getSelectors(
  (state: RootState) => state[SliceName.cache]
);
export { default as selectCacheImage } from "./selectors/selectCacheImage";
export default cacheSlice.reducer;
