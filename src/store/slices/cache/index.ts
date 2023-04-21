import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { ClearAction, UpdateAction, SetAction, DeleteAction } from "./actions";
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
  },
});

export const { setCache, updateCache, clearCache, deleteCache } =
  cacheSlice.actions;

export const { selectById: selectCacheByKey } = cacheAdapter.getSelectors(
  (state: RootState) => state[SliceName.cache]
);

export default cacheSlice.reducer;
