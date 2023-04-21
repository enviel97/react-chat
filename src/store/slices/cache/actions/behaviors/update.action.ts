import { PayloadAction } from "@reduxjs/toolkit";
import { CacheState } from "@store/slices/state/cache";
import cacheAdapter from "../../adapter/cacheAdapter";
import hashKey from "../utils/hash";

interface Options {
  ttl?: number;
}

interface Props {
  key: any;
  value: any;
  option?: Options;
}

const UpdateAction = (state: CacheState, action: PayloadAction<Props>) => {
  const { key, value } = action.payload;
  const draffKey = typeof key === "string" ? key : hashKey(key);
  cacheAdapter.upsertOne(state, { key: draffKey, value });
};

export default UpdateAction;
