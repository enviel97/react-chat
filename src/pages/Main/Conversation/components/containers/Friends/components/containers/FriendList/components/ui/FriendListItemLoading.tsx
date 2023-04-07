import SkeletonContainer from "@components/Skeleton";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import Skeleton from "react-loading-skeleton";
import {
  FriendListItemBody,
  FriendListItemContainer,
} from "../../styles/FriendListItem.decorate";

const FriendListItemLoading = () => {
  const breakpoint = useBreakpoint();
  return (
    <SkeletonContainer height={"100%"}>
      <FriendListItemContainer>
        <FriendListItemBody>
          <span>
            <CircleAvatar isLoading={true} />
          </span>
          {breakpoint.up("laptop") && (
            <span>
              <Skeleton height={"100%"} width={100} />
            </span>
          )}
        </FriendListItemBody>
      </FriendListItemContainer>
    </SkeletonContainer>
  );
};

export default FriendListItemLoading;
