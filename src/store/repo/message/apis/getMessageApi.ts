import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_GET_LIST } from "@store/common/repo";

const getMessages = async (
  id: string,
  options: PaginationOption = {
    limit: 20,
    bucket: 0,
  }
) => {
  const response = await client.get<any, Response<Pagination<Message>>>(
    MESSAGE_GET_LIST,
    { params: options, pathVariable: { conversationId: id } }
  );
  if (response.data) return response;
  throw new Error("Internal Server Error");
};

const fetchMessages = createAsyncThunk("messages/list", async (id: string) => {
  return await getMessages(id);
});

export default fetchMessages;
