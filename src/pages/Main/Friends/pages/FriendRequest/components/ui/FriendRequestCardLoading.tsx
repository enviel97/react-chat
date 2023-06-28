import SkeletonContainer from "@components/Skeleton";
import { avatarCardShadow, cardShadow } from "@pages/Main/Friends/styles/utils";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const CardContainer = styled.div`
  height: 28rem;
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem;
  display: block;
  box-shadow: ${cardShadow};
`;

const CardAvatar = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: inherit;
  box-shadow: ${avatarCardShadow};
  padding: 0.2rem 0.4rem 0.75rem 0.5rem;
  overflow: hidden;
`;

const CardContent = styled.div`
  border-radius: inherit;
  padding: 0.75rem 0;
  overflow: hidden;
`;

const FriendRequestCardLoading = () => {
  return (
    <SkeletonContainer>
      <CardContainer>
        <CardAvatar>
          <Skeleton height={"100%"} borderRadius='10px' />
        </CardAvatar>
        <CardContent>
          <Skeleton count={2} />
        </CardContent>
      </CardContainer>
    </SkeletonContainer>
  );
};

export default FriendRequestCardLoading;
