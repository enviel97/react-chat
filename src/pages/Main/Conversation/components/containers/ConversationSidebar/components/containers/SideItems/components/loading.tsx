import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo } from "react";
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
    <SideItemContainer>
      <CircleAvatar className='avatar' />
      <KSideItemContent>
        <SkeletonElement isLoading />
        <SkeletonElement isLoading />
      </KSideItemContent>
    </SideItemContainer>
  );
});

const Loading: FC<LoadingProps> = ({ count = 1 }) => {
  return (
    <SkeletonContainer>
      <SideItemsContainer>
        {[...Array(count).keys()].map((key) => {
          return <UILoading key={key} />;
        })}
      </SideItemsContainer>
    </SkeletonContainer>
  );
};

export default Loading;
