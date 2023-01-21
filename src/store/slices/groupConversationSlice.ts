import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import SliceName from "../common/sliceName";
import string from "@utils/string";
import {
  fetchAddConversation,
  fetchGroupConversations,
} from "@store/repo/conversation";
import { State } from "@store/common/state";
import moment from "moment";

const groupConversationsAdapter = createEntityAdapter<Conversation>({
  selectId: (conversation) => string.getId(conversation),
  sortComparer: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
});

export const groupConversationsSlice = createSlice({
  name: SliceName.groupConversation,
  initialState: groupConversationsAdapter.getInitialState({
    process: State.IDLE,
  }),
  reducers: {
    addConversation: groupConversationsAdapter.addOne,
    updateLastMessage: (
      state: any,
      action: PayloadAction<UpdateLastMessageConversationPayload>
    ) => {
      const payload = action.payload;
      if (payload.message === null) return;
      const conversation = groupConversationsAdapter
        .getSelectors()
        .selectById(state, payload.conversationId);

      if (!conversation) return;
      groupConversationsAdapter.updateOne(state, {
        id: payload.conversationId,
        changes: {
          lastMessage: payload.message,
          updatedAt: payload.message?.updatedAt ?? moment().toISOString(),
        },
      });
    },
  },
  extraReducers: (builder) => {
    // #region Builder for fetch all Conversation
    builder
      .addCase(fetchGroupConversations.pending, (state, action) => {
        state.process = State.PENDING;
      })
      .addCase(fetchGroupConversations.rejected, (state, action) => {
        state.process = State.ERROR;
      })
      .addCase(
        fetchGroupConversations.fulfilled,
        (state, action: PayloadAction<Response<any>>) => {
          const payload = action.payload;
          const conversation = payload.data;

          groupConversationsAdapter.upsertMany(state, conversation);
          //
          state.process = State.FULFILLED;
        }
      );
    // #endregion
    // #region Builder for fetch add Conversation
    builder
      .addCase(fetchAddConversation.pending, (state, action) => {
        state.process = State.PENDING;
      })
      .addCase(fetchAddConversation.rejected, (state, action) => {
        state.process = State.ERROR;
      })
      .addCase(
        fetchAddConversation.fulfilled,
        (state, action: PayloadAction<Response<any>>) => {
          const payload = action.payload;
          const conversation = payload.data;
          groupConversationsAdapter.upsertOne(state, conversation);
          //
          state.process = State.FULFILLED;
        }
      );
    // #endregion
  },
});

export const { addConversation, updateLastMessage } =
  groupConversationsSlice.actions;

export const {
  selectById: selectGroupConversationById,
  selectAll: selectAllGroupConversations,
} = groupConversationsAdapter.getSelectors(
  (state: any) => state[SliceName.groupConversation]
);

export default groupConversationsSlice.reducer;
