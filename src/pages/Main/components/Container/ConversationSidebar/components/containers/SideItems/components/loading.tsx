import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { FC, memo, useMemo } from "react";
import styled from "styled-components";
import {
  SideItemContainer,
  SideItemContent,
  SideItemsContainer,
} from "../../../../styles/Sidebar.decorate";

const KSideItemContent = styled(SideItemContent)`
  padding: 0;
`;
interface LoadingProps {
  count?: number;
}

const UILoading = memo(() => {
  return (
    <SkeletonContainer>
      <SideItemContainer>
        <CircleAvatar className='avatar' isLoading />
        <KSideItemContent>
          <SkeletonElement isLoading />
          <SkeletonElement isLoading />
        </KSideItemContent>
      </SideItemContainer>
    </SkeletonContainer>
  );
});

const Loading: FC<LoadingProps> = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count).keys()].map(() => {
        return <UILoading />;
      })}
    </>
  );
};

export default Loading;
