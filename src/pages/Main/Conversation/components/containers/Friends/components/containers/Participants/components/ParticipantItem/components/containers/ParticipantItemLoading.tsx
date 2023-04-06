import SkeletonContainer from "@components/Skeleton";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import Skeleton from "react-loading-skeleton";
import {
  ParticipantItemBody,
  ParticipantItemContainer,
} from "../../styles/ParticipantItem.decorate";

const ParticipantItemLoading = () => {
  const breakpoint = useBreakpoint();
  return (
    <SkeletonContainer height={"100%"}>
      <ParticipantItemContainer>
        <ParticipantItemBody>
          <span>
            <CircleAvatar isLoading={true} />
          </span>
          {breakpoint.up("laptop") && (
            <span>
              <Skeleton height={"100%"} width={100} />
            </span>
          )}
        </ParticipantItemBody>
      </ParticipantItemContainer>
    </SkeletonContainer>
  );
};
export default ParticipantItemLoading;
