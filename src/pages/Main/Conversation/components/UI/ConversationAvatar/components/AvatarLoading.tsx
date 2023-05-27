import SkeletonContainer from "@components/Skeleton";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

const AvatarLoading = () => {
  const size = "2.5em";
  return (
    <SkeletonContainer>
      <Skeleton width={size} height={size} circle />
    </SkeletonContainer>
  );
};

export default memo(AvatarLoading);
