import { EntityState } from "@reduxjs/toolkit";

type Cache = { key: string; value: any };

export interface CacheState extends EntityState<Cache> {}
