import SkeletonContainer from "@components/Skeleton";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { ChannelHeaderContainer } from "../../../../styles/Channel.decorate";

const ChannelHeaderLoading = () => {
  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <Skeleton width={40} height={40} circle />
        <Skeleton width={100} height={"1.5em"} />
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default memo(ChannelHeaderLoading);
