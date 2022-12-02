import useBreakpoint from "@hooks/useBreakpoint";
import { SideHeaderContainer } from "../styles/Sidebar.decorate";
import SideAddChannelButton from "./SideAddChannelButton";

const SideHeader = () => {
  const breakpoint = useBreakpoint();
  return (
    <SideHeaderContainer>
      {breakpoint.up("tablet") && <span>Conversations</span>}
      <SideAddChannelButton />
    </SideHeaderContainer>
  );
};

export default SideHeader;
