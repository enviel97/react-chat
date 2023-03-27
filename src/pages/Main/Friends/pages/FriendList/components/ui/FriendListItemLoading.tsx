import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC } from "react";
import { useTheme } from "styled-components";
import {
  FriendListItemContainer,
  FriendListItemTrail,
} from "./FriendListItem/styles/FriendListItem.decorate";

const FriendListItemLoading: FC = () => {
  const theme = useTheme();
  return (
    <SkeletonContainer>
      <FriendListItemContainer>
        <FriendListItemTrail>
          <SkeletonElement
            isLoading
            height={"100%"}
            baseColor={theme.backgroundColor}
            highlightColor={theme.surfaceColor}
          />
        </FriendListItemTrail>
      </FriendListItemContainer>
    </SkeletonContainer>
  );
};

export default FriendListItemLoading;
