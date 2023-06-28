import Faded from "@components/Animation/Faded";
import useAppSelector from "@hooks/useAppSelector";
import { isRefresh } from "@utils/validate";
import { memo } from "react";
import { PongSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";

const CornerLoading = () => {
  const theme = useTheme();
  const status = useAppSelector((state) => {
    return state["friend-request"].process;
  });
  if (isRefresh(status))
    return (
      <Faded>
        <PongSpinner size={100} color={theme.secondaryColor} />
      </Faded>
    );
  return <></>;
};
export default memo(CornerLoading);
