import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC, memo } from "react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";
import {
  FriendListItemBody,
  FriendListItemContainer,
  FriendListItemTrail,
} from "./FriendListItem/styles/FriendListItem.decorate";

const FriendListItemLoading: FC = () => {
  const theme = useTheme();
  return (
    <SkeletonContainer
      baseColor={theme.backgroundColor}
      highlightColor={theme.surfaceColor}
    >
      <FriendListItemContainer>
        <FriendListItemTrail>
          <SkeletonElement isLoading height={"100%"} />
        </FriendListItemTrail>
        <FriendListItemBody>
          <Skeleton height={"1.25rem"} width={"30svw"} count={3} />
          <Skeleton height={"1.25rem"} width={"10svw"} />
        </FriendListItemBody>
      </FriendListItemContainer>
    </SkeletonContainer>
  );
};

export default memo(FriendListItemLoading);
