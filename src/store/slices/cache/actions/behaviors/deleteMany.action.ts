import { PayloadAction } from "@reduxjs/toolkit";
import { CacheState } from "@store/slices/state/cache";
import cacheAdapter from "../../adapter/cacheAdapter";

interface Props {
  keys: any[];
}

const deleteMany = (state: CacheState, action: PayloadAction<Props>) => {
  const { keys } = action.payload;
  cacheAdapter.removeMany(state, keys);
};

export default deleteMany;
