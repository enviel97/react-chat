import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

const ChannelHeaderLoading = () => {
  return (
    <ChannelHeaderContainer>
      <CircleAvatar isLoading={true} />
      <SkeletonContainer>
        <h4 className='channelName'>
          <SkeletonElement width={250} isLoading />
        </h4>
      </SkeletonContainer>
    </ChannelHeaderContainer>
  );
};
export default ChannelHeaderLoading;
