import { createEntityAdapter } from "@reduxjs/toolkit";

type Cache = { key: string; value: any };

const cacheAdapter = createEntityAdapter<Cache>({
  selectId: (cache) => cache.key,
});

export default cacheAdapter;
