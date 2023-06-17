import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { Mousewheel, FreeMode, Navigation } from "swiper";
import useSearch from "../hooks/useSearch";
import { Animation } from "../styles/ModalFriendRequest.animation";
import {
  ModalFriendRequestBody,
  ModalFriendRequestItem,
  ModalFriendRequestItemAnimate,
  ModalFriendRequestList,
} from "../styles/ModalFriendRequest.decorate";
import AddFriendCard from "./AddFriendCard";

const ModalBody = () => {
  const {
    state: { data },
  } = useSearch();

  return (
    <AnimatePresence mode='wait'>
      {data && data.length !== 0 && (
        <ModalFriendRequestBody {...Animation.Container}>
          <ModalFriendRequestList
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 2 },
              800: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Mousewheel, FreeMode, Navigation]}
            mousewheel
            navigation
            freeMode
          >
            {data.map((friend, index) => {
              return (
                <ModalFriendRequestItem key={index}>
                  <ModalFriendRequestItemAnimate
                    {...Animation.Item}
                    custom={index}
                  >
                    <AddFriendCard profile={friend} />
                  </ModalFriendRequestItemAnimate>
                </ModalFriendRequestItem>
              );
            })}
          </ModalFriendRequestList>
        </ModalFriendRequestBody>
      )}
    </AnimatePresence>
  );
};

export default memo(ModalBody);
