import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import {
  SideItemContainer,
  SideItemContent,
} from "../../../styles/Sidebar.decorate";

const Loading = () => {
  return (
    <SkeletonContainer>
      <SideItemContainer>
        <CircleAvatar className='avatar' isLoading />
        <SideItemContent>
          <SkeletonElement>
            <span className='Messenger'>{}</span>
          </SkeletonElement>

          <SkeletonElement>
            <span className={`Content`.trim()}>
              <SkeletonElement count={2}>
                <span className='Content--Text' />
              </SkeletonElement>
              <SkeletonElement count={2}>
                <span className='Content--Time' />
              </SkeletonElement>
            </span>
          </SkeletonElement>
        </SideItemContent>
      </SideItemContainer>
    </SkeletonContainer>
  );
};

export default Loading;
