import { PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "@store/slices/state/ui";

const updateTotalFriendRequest = (
  state: UiState,
  action: PayloadAction<number>
) => {
  const quantity = action.payload;
  state.totalFriendRequest = quantity;
};

export default updateTotalFriendRequest;
