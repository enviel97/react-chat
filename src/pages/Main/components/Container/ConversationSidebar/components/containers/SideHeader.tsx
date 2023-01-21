import useBreakpoint from "@hooks/useBreakpoint";
import { SideHeaderContainer } from "../../styles/Sidebar.decorate";

const SideHeader = () => {
  const breakpoint = useBreakpoint();
  return (
    <SideHeaderContainer>
      {breakpoint.up("tablet") && <span>Conversations</span>}
    </SideHeaderContainer>
  );
};

export default SideHeader;
