import { PayloadAction } from "@reduxjs/toolkit";
import { CacheState } from "@store/slices/state/cache";
import cacheAdapter from "../../adapter/cacheAdapter";
import hashKey from "../utils/hash";

const DeleteAction = (state: CacheState, action: PayloadAction<any>) => {
  const key = action.payload;
  const draffKey = typeof key === "string" ? key : hashKey(key);
  cacheAdapter.removeOne(state, draffKey);
};

export default DeleteAction;
