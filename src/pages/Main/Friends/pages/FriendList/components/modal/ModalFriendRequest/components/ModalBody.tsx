import { memo } from "react";
import useSearch from "../hooks/useSearch";
import {
  ModalFriendRequestBody,
  ModalFriendRequestList,
} from "../styles/ModalFriendRequest.decorate";
import AddFriendCard from "./AddFriendCard";

const ModalBody = () => {
  const {
    state: { data },
  } = useSearch();

  return (
    <ModalFriendRequestBody>
      {data && (
        <ModalFriendRequestList>
          {data.map((profile, index) => {
            return (
              <AddFriendCard
                key={`${profile.getId()}$${index}`}
                profile={profile}
              />
            );
          })}
        </ModalFriendRequestList>
      )}
    </ModalFriendRequestBody>
  );
};

export default memo(ModalBody);
