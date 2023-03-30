import { memo } from "react";
import ModalBody from "./components/ModalBody";
import ModalHeader from "./components/ModalHeader";
import SearchProvider from "./context/SearchProvider";
import { ModalFriendRequestContainer } from "./styles/ModalFriendRequest.decorate";

const ModalFriendRequest = () => {
  return (
    <SearchProvider>
      <ModalFriendRequestContainer>
        <ModalHeader />
        <ModalBody />
      </ModalFriendRequestContainer>
    </SearchProvider>
  );
};

export default memo(ModalFriendRequest);
