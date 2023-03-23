import Divider from "@components/Divider";
import string from "@utils/string";
import { FC, lazy, memo, Suspense } from "react";
import {
  ListFriendContainer,
  ListFriendHeaderTitle,
} from "./styles/ListFriend.decorate";
const FriendItem = lazy(() => import("./components/containers/ListItems"));

const ListFriend: FC<ListFriendProps> = ({
  groupTitle,
  data = [],
  role,
  canBanned,
}) => {
  return (
    <ListFriendContainer>
      <ListFriendHeaderTitle>
        <span>{groupTitle}</span>
        <span>{`(${data.length})`}</span>
      </ListFriendHeaderTitle>
      <Divider />
      <Suspense fallback={"Loading ..."}>
        {data.length !== 0 &&
          data.map((user) => {
            const _role = (role && role[string.getId(user)]) ?? "Member";
            return (
              <FriendItem
                key={string.getId(user)}
                user={user}
                role={_role}
                canBanned={canBanned}
              />
            );
          })}
      </Suspense>
    </ListFriendContainer>
  );
};

export default memo(ListFriend);
