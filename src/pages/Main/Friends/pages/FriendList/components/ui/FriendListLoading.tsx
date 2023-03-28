import SkeletonContainer from "@components/Skeleton";
import { FriendListItemsContainer } from "../../styles/FriendList.decorate";
import FriendListItemLoading from "./FriendListItemLoading";

const FriendListLoading = () => {
  return (
    <SkeletonContainer>
      <FriendListItemsContainer>
        {Array.from({ length: 2 }, (_, i) => (
          <FriendListItemLoading key={`${i}`} />
        ))}
      </FriendListItemsContainer>
    </SkeletonContainer>
  );
};

export default FriendListLoading;
