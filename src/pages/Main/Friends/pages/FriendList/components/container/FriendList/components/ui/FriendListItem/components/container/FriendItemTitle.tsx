import { FC, memo } from "react";
import { FriendItemTitleContainer } from "../../styles/FriendListItem.decorate";

interface Props {
  mainName: string;
  subName?: string;
}

const FriendItemTitle: FC<Props> = ({ mainName, subName }) => {
  return (
    <FriendItemTitleContainer>
      <span>{mainName}</span>
      {subName && <span>({subName})</span>}
    </FriendItemTitleContainer>
  );
};

export default memo(FriendItemTitle);
