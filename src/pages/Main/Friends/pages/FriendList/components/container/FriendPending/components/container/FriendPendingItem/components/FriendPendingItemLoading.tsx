import SkeletonContainer from "@components/Skeleton";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";
import CancelButton from "../../../ui/CancelButton";
import {
  Action,
  Body,
  Container,
  Title,
} from "../styles/FriendPendingItem.decorate";

const FriendItemPendingLoading = () => {
  const theme = useTheme();
  return (
    <SkeletonContainer
      highlightColor={theme.surfaceColor}
      baseColor={theme.backgroundColor}
      height={"100%"}
    >
      <Container>
        <Skeleton wrapper={Title} circle />
        <Body>
          <Skeleton width={100} count={2} />
        </Body>
        <Action>
          <CancelButton friendId={""} friendName={""} isLoading />
        </Action>
      </Container>
    </SkeletonContainer>
  );
};

export default FriendItemPendingLoading;
