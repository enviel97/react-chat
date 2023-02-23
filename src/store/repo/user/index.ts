import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchUser } from "./api";

export const fetchSearchUser = createAsyncThunk(
  "users/search",
  async (participant: string) => await searchUser(participant)
);
