import { SideHeaderContainer } from "../styles/Sidebar.decorate";
import SideAddChannelButton from "./SideAddChannelButton";

const SideHeader = () => {
  return (
    <SideHeaderContainer>
      <span>Conversations</span>
      <SideAddChannelButton />
    </SideHeaderContainer>
  );
};

export default SideHeader;
