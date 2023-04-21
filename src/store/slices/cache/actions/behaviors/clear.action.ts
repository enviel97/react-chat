import { CacheState } from "@store/slices/state/cache";
import cacheAdapter from "../../adapter/cacheAdapter";

const ClearAction = (state: CacheState) => {
  cacheAdapter.removeAll(state);
};

export default ClearAction;
