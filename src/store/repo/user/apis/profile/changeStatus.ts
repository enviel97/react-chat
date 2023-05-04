import client from "@core/api";
import { mappingResponse } from "@core/utils/mapping";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_PATCH_STATUS } from "@store/common/repo";
import axios from "axios";

type Request = "active" | "not-disturb" | "waiting";

const changeStatus = createAsyncThunk(
  "user/profile/status",
  async (status: Request, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await client.patch<Request, Response<UserProfile>>(
      PROFILE_PATCH_STATUS,
      { status }
    );

    return mappingResponse(response);
  }
);

export default changeStatus;
