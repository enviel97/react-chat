import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import SliceName from "../common/sliceName";
import string from "@utils/string";
import {
  fetchAddConversation,
  fetchConversations,
} from "@store/repo/conversation";
import { State } from "@store/common/state";
import { addMessages, removeMessage } from "./messageSlice";
import { fetchAddMessages, fetchDeleteMessages } from "@store/repo/message";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: (conversation) => string.getId(conversation),
  sortComparer: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
});

export const conversationsSlice = createSlice({
  name: SliceName.conversation,
  initialState: conversationsAdapter.getInitialState({
    process: State.IDLE,
  }),
  reducers: {
    addConversation: conversationsAdapter.addOne,
    updateLastMessage: (
      state: any,
      action: PayloadAction<UpdateLastMessageConversationPayload>
    ) => {
      const payload = action.payload;

      const conversation = conversationsAdapter
        .getSelectors()
        .selectById(state, payload.conversationId);

      if (!conversation) return;
      conversationsAdapter.updateOne(state, {
        id: payload.conversationId,
        changes: {
          ...conversation,
          lastMessage: payload.message,
          ...(payload.message && { updatedAt: payload.message.updatedAt }),
        },
      });
    },
  },
  extraReducers: (builder) => {
    // #region Builder for fetch all Conversation
    builder
      .addCase(fetchConversations.pending, (state, action) => {
        state.process = State.PENDING;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.process = State.ERROR;
      })
      .addCase(
        fetchConversations.fulfilled,
        (state, action: PayloadAction<Response<any>>) => {
          const payload = action.payload;
          const conversation = payload.data;
          conversationsAdapter.upsertMany(state, conversation);
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
          conversationsAdapter.upsertOne(state, conversation);
          //
          state.process = State.FULFILLED;
        }
      );
    // #endregion
  },
});

export const { addConversation, updateLastMessage } =
  conversationsSlice.actions;

export const {
  selectById: selectConversationById,
  selectIds: selectConversationIds,
  selectEntities: selectConversationEntities,
  selectAll: selectAllConversations,
} = conversationsAdapter.getSelectors(
  (state: any) => state[SliceName.conversation]
);

export default conversationsSlice.reducer;
