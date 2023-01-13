import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import SliceName from "../common/sliceName";
import string from "@utils/string";
import { State } from "@store/common/state";
import {
  fetchAddMessages,
  fetchDeleteMessages,
  fetchMessages,
} from "@store/repo/message";

const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => string.getId(message),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export const messagesSlice = createSlice({
  name: SliceName.message,
  initialState: messagesAdapter.getInitialState({
    process: State.IDLE,
  }),
  reducers: {
    addMessages: messagesAdapter.addOne,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state, _) => {
        state.process = State.PENDING;
      })
      .addCase(fetchMessages.rejected, (state, _) => {
        state.process = State.ERROR;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<Response<any>>) => {
          const payload = action.payload;
          const pagination = payload.data;
          if (Number(pagination?.bucket ?? -1) === 0) {
            messagesAdapter.removeAll(state);
          }
          messagesAdapter.upsertMany(state, pagination.data);
          //
          state.process = State.FULFILLED;
        }
      );

    builder.addCase(
      fetchAddMessages.fulfilled,
      (state, action: PayloadAction<Response<any>>) => {
        const payload = action.payload;
        const message = payload.data;
        messagesAdapter.upsertOne(state, message);
      }
    );

    builder.addCase(
      fetchDeleteMessages.fulfilled,
      (state, action: PayloadAction<Response<ResponseDeleteMessage>>) => {
        const payload = action.payload;
        const data = payload.data;
        messagesAdapter.removeOne(state, string.getId(data?.messageId));
      }
    );
  },
});

export const { addMessages, removeMessage } = messagesSlice.actions;

export const {
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectAll: selectAllMessage,
} = messagesAdapter.getSelectors((state: any) => state[SliceName.message]);

export default messagesSlice.reducer;
