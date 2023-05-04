import client from "@core/api";
import { mappingResponse } from "@core/utils/mapping";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_PATCH_UPDATE } from "@store/common/repo";
import axios from "axios";
interface Request {
  bio?: string;
  displayName: string;
}
const updateProfile = createAsyncThunk(
  "user/profile/update",
  async ({ bio, displayName }: Request, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await client.patch<Request, Response<UserProfile>>(
      PROFILE_PATCH_UPDATE,
      { bio, displayName }
    );

    return mappingResponse(response);
  }
);

export default updateProfile;
