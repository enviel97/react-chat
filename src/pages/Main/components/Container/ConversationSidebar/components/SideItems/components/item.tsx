import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideItemContainer } from "../../../styles/Sidebar.decorate";

enum Status {
  New = "New",
  Seen = "Seen",
}

interface ItemProps {
  channel: Channel;
}

const Item: FC<ItemProps> = ({ channel }) => {
  const [status, setStatus] = useState<Status>(Status.New);
  const navigator = useNavigate();

  const _seen = () => {
    // TODO: Seen
    setStatus(Status.Seen);
    navigator(`messenger/${channel.id}`);
  };

  return (
    <SideItemContainer onClick={_seen}>
      <CircleAvatar className='avatar' />
      <div className='Message'>
        <span className='Messenger'>Channel name</span>

        <span className={`Content ${status ?? ""}`.trim()}>
          <span className='Content--Text'>
            Very long Messenger add {channel.id}
          </span>
          <span className='Content--Time'>
            00:00
            {status === Status.New && <div className='Circle' />}
          </span>
        </span>
      </div>
    </SideItemContainer>
  );
};

export default Item;
