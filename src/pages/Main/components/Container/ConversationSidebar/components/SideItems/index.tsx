import { getConversations } from "@pages/Main/repo/conversation";
import { FC, useEffect, useState } from "react";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../styles/Sidebar.decorate";
import Item from "./components/item";

interface SideItemProps {}

const SideItems: FC<SideItemProps> = (props) => {
  const [channels, setChannel] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations()
      .then((res) => {
        setChannel(res.data ?? []);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SideItemsContainer>
      {channels.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {channels.length !== 0 &&
        channels.map((channel, index) => {
          return (
            <Item
              key={`${channel.id ?? channel._id}&${index}`}
              channel={channel}
            />
          );
        })}
    </SideItemsContainer>
  );
};

export default SideItems;
