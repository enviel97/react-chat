import client from "@core/api";
import { mappingResponse } from "@core/utils/mapping";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_PATCH_RELATIONSHIP } from "@store/common/repo";
import axios from "axios";

type Request = string;
type Relationship = "guest" | "friend" | "block" | "pending";

const getRelationship = createAsyncThunk(
  "user/profile/relationship",
  async (friendId: Request, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await client.get<Request, Response<Relationship>>(
      PROFILE_PATCH_RELATIONSHIP,
      { pathVariable: { idFriendProfile: friendId } }
    );

    return mappingResponse(response);
  }
);

export default getRelationship;
