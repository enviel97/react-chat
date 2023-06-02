import { memo } from "react";
import { CircleSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";
import { SideItemLoading } from "../../../../styles/Sidebar.decorate";

const SideRefreshAnimate = () => {
  const theme = useTheme();

  return (
    <SideItemLoading
      variants={{
        visible: { x: 0, opacity: 1 },
        hidden: { x: -10, opacity: 0 },
      }}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ bounce: 0 }}
    >
      <span>
        <CircleSpinner color={theme.disableColor} size={24} />
      </span>
    </SideItemLoading>
  );
};
export default memo(SideRefreshAnimate);
