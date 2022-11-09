import { useState } from "react";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../styles/Sidebar.decorate";
import Item from "./components/item";

interface SideItemProps {}

const SideItems = (props: SideItemProps) => {
  const [channels, setChannel] = useState<Channel[]>([]);

  return (
    <SideItemsContainer>
      {channels.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {channels.length !== 0 &&
        channels.map((channel, index) => {
          return <Item key={`${channel.id}_${index}`} channel={channel} />;
        })}
    </SideItemsContainer>
  );
};

export default SideItems;
