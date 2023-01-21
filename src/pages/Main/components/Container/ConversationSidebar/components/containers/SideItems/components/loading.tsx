import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import styled from "styled-components";
import {
  SideItemContainer,
  SideItemContent,
} from "../../../../styles/Sidebar.decorate";

const KSideItemContent = styled(SideItemContent)`
  padding: 0;
`;

const Loading = () => {
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
};

export default Loading;
