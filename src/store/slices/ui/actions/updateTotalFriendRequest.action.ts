import { PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "@store/slices/state/ui";

const updateTotalFriendRequest = (
  state: UiState,
  action: PayloadAction<number | undefined>
) => {
  const quantity = action.payload;
  if (!quantity || state.totalFriendRequest === quantity) return;
  state.totalFriendRequest = quantity;
};

export default updateTotalFriendRequest;
