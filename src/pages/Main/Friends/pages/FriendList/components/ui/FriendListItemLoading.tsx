import { ButtonIcon } from "@components/Button";
import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { FC, memo } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";
import {
  FriendListItemAction,
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
        <FriendListItemAction>
          <ButtonIcon
            size='2.5rem'
            icon={<FaUserAltSlash size='2rem' />}
            circle
            color='notification'
            hint='Unfriend'
            disabled
          />
        </FriendListItemAction>
      </FriendListItemContainer>
    </SkeletonContainer>
  );
};

export default memo(FriendListItemLoading);
